import "./AppView.sass";

import { setRecoil } from "recoil-nexus";
import MenuCollapnessMemory from "../memory/MenuCollapness";

export interface AppViewProps {
  title: string;
  url: string;
}

export default function AppView(props: AppViewProps): JSX.Element {
  function handleOnLoaded() {
    const menuElement = document.getElementById("menu");
    if (menuElement) {
      menuElement.scrollTop = menuElement.clientHeight;
      setRecoil(MenuCollapnessMemory, 1);
    }
  }

  if (typeof require("fs").existsSync === "function") {
    return (
      <webview
        className="appview"
        title={props.title}
        src={props.url}
        nodeintegration
        plugins
        webpreferences="nodeIntegrationInSubFrames,allowRunningInsecureContent,contextIsolation=no,webviewTag"
        onLoad={handleOnLoaded}
      />
    );
  } else {
    return (
      <iframe
        className="appview"
        title={props.title}
        src={props.url}
        sandbox="allow-same-origin allow-forms allow-modals allow-orientation-lock allow-scripts"
        onLoad={handleOnLoaded}
      />
    );
  }
}
