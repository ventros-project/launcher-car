import { getRecoil, setRecoil } from "recoil-nexus";
import QuickSettingMemory from "../memory/QuickSetting";

export default function toggleDoor() {
  // TODO: Hubungkan ke service
  const lastState = getRecoil(QuickSettingMemory);
  if (!lastState.updatingDoor) {
    setRecoil(QuickSettingMemory, {
      ...lastState,
      updatingDoor: true,
    });
    window.setTimeout(() => {
      const lastState = getRecoil(QuickSettingMemory);
      setRecoil(QuickSettingMemory, {
        ...lastState,
        updatingDoor: false,
        door: !lastState.door,
      });
    }, 3000);
  }
}
