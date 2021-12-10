import { atom } from "recoil";

export const MenuCollapness = atom<number>({
  key: "menu-collapness",
  default: 0,
});

export default MenuCollapness;
