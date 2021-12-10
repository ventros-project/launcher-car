import { setRecoil } from "recoil-nexus";
import BatteryMemory from "../memory/Battery";

let currentLevel = 83;

function refreshBattery() {
  if (window.ipcRenderer) {
    //
  } else {
    // CONDITION: Development with browser
    if (currentLevel > 42) {
      currentLevel -= 0.05;
    }
    const temperature = 40 + Math.round(Math.random() * 15);
    const distanceRemaining = 1354 * currentLevel;
    const voltage = 100 + Math.round(Math.random() * 50);
    const current = 5 + Math.round(Math.random() * 5);

    setRecoil(BatteryMemory, {
      level: currentLevel,
      temperature,
      voltage,
      current,
      distanceRemaining,
      isAvailable: true,
      isBroken: false,
      isCharging: false,
    });
  }
}

export default function BatteryTask() {
  refreshBattery();
  window.setInterval(refreshBattery, 10000);
}
