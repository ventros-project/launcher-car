import { setRecoil } from "recoil-nexus";
import CellularMemory, { NetworkModeType } from "../memory/Cellular";

function refreshCellular() {
  if (window.ipcRenderer) {
    //
  } else {
    // CONDITION: Development with browser
    const cellLevel = 20 + Math.round(Math.random() * 70);
    const networkModeID = Math.floor(Math.random() * 4);
    let networkMode: NetworkModeType = "";
    switch (networkModeID) {
      case 0:
        networkMode = "3G";
        break;
      case 1:
        networkMode = "3G+";
        break;
      case 2:
        networkMode = "4G";
        break;
      case 3:
        networkMode = "4G+";
        break;
    }
    setRecoil(CellularMemory, {
      level: cellLevel,
      networkMode,
      carrierName: "ACME Cellular Corp.",
      country: "Indonesia",
    });
  }
}

export default function CellularTask() {
  refreshCellular();
  window.setInterval(refreshCellular, 10000);
}
