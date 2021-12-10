import { atom } from "recoil";

export interface AppListSchema {
  name: string;
  url: string;
  icon?: string;
}

export type AppListType = AppListSchema[] | null;

export const AppList = atom<AppListType>({
  key: "app-list",
  default: null,
});

export default AppList;
