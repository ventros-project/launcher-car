import { setRecoil } from "recoil-nexus";
import QuickSettingMemory from "../memory/QuickSetting";

export default function QuickSettingTask() {
  if (window.ipcRenderer) {
    //
  } else {
    // CONDITION: Development with browser
    setRecoil(QuickSettingMemory, {
      internet: true,
      accessPoint: false,
      bluetooth: false,
      powerSave: false,
      sonar: false,
      door: false,
      updatingInternet: false,
      updatingAccessPoint: false,
      updatingBluetooth: false,
      updatingPowerSave: false,
      updatingSonar: false,
      updatingDoor: false,
    });
  }
}
