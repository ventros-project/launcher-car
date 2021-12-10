import { atom } from "recoil";

export interface QuickSettingMemoryType {
  internet: boolean;
  accessPoint: boolean;
  bluetooth: boolean;
  powerSave: boolean;
  sonar: boolean;
  door: boolean;
  updatingInternet: boolean;
  updatingAccessPoint: boolean;
  updatingBluetooth: boolean;
  updatingPowerSave: boolean;
  updatingSonar: boolean;
  updatingDoor: boolean;
}

export const QuickSettingMemory = atom<QuickSettingMemoryType>({
  key: "quick-setting",
  default: {
    internet: false,
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
  },
});

export default QuickSettingMemory;
