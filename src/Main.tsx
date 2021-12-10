import "./Main.sass";

import { useRecoilState } from "recoil";

import WindowMemory from "./memory/Window";
import Menu from "./components/Menu";
import AppView from "./components/AppView";

export default function Main() {
  const [windowState] = useRecoilState(WindowMemory);

  function renderAppView(eachURL: string, index: number): JSX.Element {
    return <AppView key={eachURL} url={eachURL} title={`App #${index + 1}`} />;
  }

  return (
    <main>
      <Menu />
      <div id="appwindow" className={windowState.isVertical ? "vertical" : undefined}>
        {windowState.openURL.map(renderAppView)}
      </div>
    </main>
  );
}
