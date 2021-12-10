import { getRecoil, setRecoil } from "recoil-nexus";
import QuickSettingMemory from "../memory/QuickSetting";

export default function toggleInternet() {
  // TODO: Hubungkan ke service
  const lastState = getRecoil(QuickSettingMemory);
  if (!lastState.updatingInternet) {
    setRecoil(QuickSettingMemory, {
      ...lastState,
      updatingInternet: true,
    });
    window.setTimeout(() => {
      const lastState = getRecoil(QuickSettingMemory);
      setRecoil(QuickSettingMemory, {
        ...lastState,
        updatingInternet: false,
        internet: !lastState.internet,
      });
    }, 3000);
  }
}
