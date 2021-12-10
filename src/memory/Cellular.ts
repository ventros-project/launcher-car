import { atom } from "recoil";

export type NetworkModeType = "" | "G" | "2G" | "3G" | "3G+" | "4G" | "4G+";

export interface CellularMemoryType {
  level: number;
  networkMode: NetworkModeType;
  carrierName: string;
  country: string;
}

export const CellularMemory = atom<CellularMemoryType>({
  key: "cellular",
  default: {
    level: 0,
    networkMode: "",
    carrierName: "",
    country: "",
  },
});

export default CellularMemory;
