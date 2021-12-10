import { atom } from "recoil";

export interface WindowMemoryType {
  maximum: number;
  openURL: string[];
  isVertical: boolean;
}

export const WindowMemory = atom<WindowMemoryType>({
  key: "window",
  default: {
    maximum: 1,
    openURL: [],
    isVertical: false,
  },
});

export default WindowMemory;
