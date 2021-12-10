import { setRecoil } from "recoil-nexus";

import AppListMemory, { AppListSchema } from "../memory/AppList";

function resolveIcon(appURL: string): Promise<string | undefined> {
  const appHost: string = appURL.replace(/\/$/, "");
  return fetch(appHost + "/icon.svg")
    .then((response) => {
      if (response.headers.get("Content-Type") !== "image/svg+xml") {
        throw new Error();
      }
      return appHost + "/icon.svg";
    })
    .catch(() =>
      fetch(appHost + "/logo192.png")
        .then((response) => {
          if (response.headers.get("Content-Type") !== "image/png") {
            throw new Error();
          }
          return appHost + "/logo192.png";
        })
        .catch(() =>
          fetch(appHost + "/favicon.ico")
            .then((response) => {
              if (response.headers.get("Content-Type") !== "image/x-icon") {
                throw new Error();
              }
              return appHost + "/favicon.ico";
            })
            .catch(() => undefined)
        )
    );
}

function resolveAppName(appURL: string): Promise<string> {
  return fetch(appURL)
    .then((response) => response.text())
    .then((responseBody) => {
      const parser = new DOMParser();
      const indexPage = parser.parseFromString(responseBody, "text/html");
      const titleElement = indexPage.querySelector("title");
      if (titleElement && titleElement.text) {
        return titleElement.text;
      } else {
        return appURL.replace(/^.+:\/\//, "").replace(/\//, "");
      }
    })
    .catch(() => appURL.replace(/^.+:\/\//, "").replace(/\//, ""));
}

function resolveApp(appURL: string): Promise<AppListSchema> {
  let result: AppListSchema = {
    url: appURL,
    name: "",
  };
  return Promise.all([
    resolveAppName(appURL).then((appName) => {
      result.name = appName;
    }),
    resolveIcon(appURL).then((iconURL) => {
      result.icon = iconURL;
    }),
  ])
    .then(() => {
      return result;
    })
    .catch(() => {
      return result;
    });
}

function refreshAppList() {
  if (window.ipcRenderer) {
    window.ipcRenderer.on("system:list:app", (_event, data: string[]) => {
      const promiseList: Promise<AppListSchema>[] = [];

      data.forEach((eachAppURL) => {
        promiseList.push(resolveApp(eachAppURL));
      });

      Promise.all(promiseList).then((appList) => {
        setRecoil(AppListMemory, appList);
      });
    });
    window.ipcRenderer.send("system:list:app");
  } else {
    // CONDITION: Development with browser
    Promise.all<AppListSchema>([
      resolveApp("https://maps.google.com"),
      resolveApp("https://www.youtube.com"),
      resolveApp("https://www.google.co.id"),
    ]).then((appList) => {
      setRecoil(AppListMemory, appList);
    });
  }
}

export default function AppListTask() {
  refreshAppList();

  if (window.ipcRenderer) {
    window.addEventListener("focus", refreshAppList);
  }
}
