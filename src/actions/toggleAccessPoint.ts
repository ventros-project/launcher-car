import { getRecoil, setRecoil } from "recoil-nexus";
import QuickSettingMemory from "../memory/QuickSetting";

export default function toggleAccessPoint() {
  // TODO: Hubungkan ke service
  const lastState = getRecoil(QuickSettingMemory);
  if (!lastState.updatingAccessPoint) {
    setRecoil(QuickSettingMemory, {
      ...lastState,
      updatingAccessPoint: true,
    });
    window.setTimeout(() => {
      const lastState = getRecoil(QuickSettingMemory);
      setRecoil(QuickSettingMemory, {
        ...lastState,
        updatingAccessPoint: false,
        accessPoint: !lastState.accessPoint,
      });
    }, 3000);
  }
}
