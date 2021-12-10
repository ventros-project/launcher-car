import { getRecoil, setRecoil } from "recoil-nexus";
import QuickSettingMemory from "../memory/QuickSetting";

export default function togglePowerSave() {
  // TODO: Hubungkan ke service
  const lastState = getRecoil(QuickSettingMemory);
  if (!lastState.updatingPowerSave) {
    setRecoil(QuickSettingMemory, {
      ...lastState,
      updatingPowerSave: true,
    });
    window.setTimeout(() => {
      const lastState = getRecoil(QuickSettingMemory);
      setRecoil(QuickSettingMemory, {
        ...lastState,
        updatingPowerSave: false,
        powerSave: !lastState.powerSave,
      });
    }, 3000);
  }
}
