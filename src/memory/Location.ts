import { atom } from "recoil";

export interface LocationMemoryType {
  address: string;
  city: string;
  province: string;
  country: string;
}

export const LocationMemory = atom<LocationMemoryType>({
  key: "location",
  default: {
    address: "Jl. Teknik Sipil",
    city: "Surabaya",
    province: "Jawa Timur",
    country: "Indonesia",
  },
});

export default LocationMemory;
