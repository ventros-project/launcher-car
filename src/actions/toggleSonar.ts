import { getRecoil, setRecoil } from "recoil-nexus";
import QuickSettingMemory from "../memory/QuickSetting";

export default function toggleSonar() {
  // TODO: Hubungkan ke service
  const lastState = getRecoil(QuickSettingMemory);
  if (!lastState.updatingSonar) {
    setRecoil(QuickSettingMemory, {
      ...lastState,
      updatingSonar: true,
    });
    window.setTimeout(() => {
      const lastState = getRecoil(QuickSettingMemory);
      setRecoil(QuickSettingMemory, {
        ...lastState,
        updatingSonar: false,
        sonar: !lastState.sonar,
      });
    }, 3000);
  }
}
