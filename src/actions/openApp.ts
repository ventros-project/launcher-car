import { getRecoil, setRecoil } from "recoil-nexus";

import WindowMemory from "../memory/Window";

export default function openApp(url: string) {
  const { isVertical, maximum, openURL } = getRecoil(WindowMemory);

  if (openURL.includes(url)) {
    return;
  }

  let newOpenURL: string[] = [...openURL];
  if (newOpenURL.length >= maximum) {
    newOpenURL.pop();
  }
  newOpenURL.unshift(url);
  setRecoil(WindowMemory, {
    isVertical,
    maximum,
    openURL: newOpenURL,
  });
}
