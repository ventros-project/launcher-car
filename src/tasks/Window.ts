import { getRecoil, setRecoil } from "recoil-nexus";
import WindowMemory from "../memory/Window";

function resizeHandler() {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  let { maximum, isVertical, openURL } = getRecoil(WindowMemory);

  if (height <= (width * 10) / 16) {
    // Landscape orientation
    maximum = 2;
    isVertical = false;
  } else if (width <= (height * 10) / 16) {
    // Portrait orientation
    maximum = 2;
    isVertical = true;
  } else {
    // Screen is too square
    maximum = 1;
    isVertical = false;
  }

  if (openURL.length > maximum) {
    openURL = openURL.slice(0, maximum);
  }

  setRecoil(WindowMemory, {
    maximum,
    isVertical,
    openURL,
  });
}

export default function WindowTask() {
  resizeHandler();
  window.onresize = resizeHandler;
}
