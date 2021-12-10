import { getRecoil, setRecoil } from "recoil-nexus";
import QuickSettingMemory from "../memory/QuickSetting";

export default function toggleBluetooth() {
  // TODO: Hubungkan ke service
  const lastState = getRecoil(QuickSettingMemory);
  if (!lastState.updatingBluetooth) {
    setRecoil(QuickSettingMemory, {
      ...lastState,
      updatingBluetooth: true,
    });
    window.setTimeout(() => {
      const lastState = getRecoil(QuickSettingMemory);
      setRecoil(QuickSettingMemory, {
        ...lastState,
        updatingBluetooth: false,
        bluetooth: !lastState.bluetooth,
      });
    }, 3000);
  }
}
