import { atom } from "recoil";

export interface BatteryMemoryType {
  level: number;
  temperature: number;
  voltage: number;
  current: number;
  distanceRemaining: number;
  isAvailable: boolean;
  isBroken: boolean;
  isCharging: boolean;
}

export function distanceUnit(input: number): string {
  if (input < 1000) {
    return input + " m";
  } else {
    return Math.round(input / 1000) + " km";
  }
}

export const BatteryMemory = atom<BatteryMemoryType>({
  key: "battery",
  default: {
    level: 0,
    temperature: 0,
    voltage: 0,
    current: 0,
    distanceRemaining: 0,
    isAvailable: false,
    isBroken: false,
    isCharging: false,
  },
});

export default BatteryMemory;
