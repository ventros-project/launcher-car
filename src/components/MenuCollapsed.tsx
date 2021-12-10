import "./MenuCollapsed.sass";

import { useRecoilState } from "recoil";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DefaultAppIcon from "@mui/icons-material/Article";

import AppListMemory, { AppListSchema } from "../memory/AppList";
import TimeMemory, { zeroify, ordinalize } from "../memory/Time";
import BatteryMemory from "../memory/Battery";
import CellularMemory from "../memory/Cellular";
import QuickSettingMemory from "../memory/QuickSetting";
import WindowMemory from "../memory/Window";
import openApp from "../actions/openApp";

import batteryErrorIcon from "../assets/battery-error.svg";

export default function MenuCollapsed(): JSX.Element {
  const [appList] = useRecoilState(AppListMemory);
  const [time] = useRecoilState(TimeMemory);
  const [battery] = useRecoilState(BatteryMemory);
  const [cellular] = useRecoilState(CellularMemory);
  const [quickSetting] = useRecoilState(QuickSettingMemory);
  const [windowState] = useRecoilState(WindowMemory);

  function renderCellular(): JSX.Element {
    let networkMode: string;
    if (quickSetting.internet && cellular.networkMode) {
      networkMode = cellular.networkMode;
    } else {
      networkMode = "⨉";
    }

    return (
      <div id="menu-content-collapsed-cellular">
        <Typography id="menu-content-collapsed-cellular-text">{networkMode}</Typography>
        <div id="menu-content-collapsed-cellular-level">
          <div style={{ width: cellular.level + "%" }} />
        </div>
      </div>
    );
  }

  function renderBattery(): JSX.Element {
    if (!battery.isAvailable) {
      return <div id="menu-content-collapsed-battery" />;
    } else if (battery.isBroken) {
      return (
        <div id="menu-content-collapsed-battery">
          <img
            id="menu-content-collapsed-battery-level"
            className="error"
            src={batteryErrorIcon}
            alt="Battery cannot working properly"
            draggable="false"
          />
        </div>
      );
    } else {
      const isRed = battery.temperature >= 60 || battery.level < 20;
      const backgroundColor = isRed ? "#ffcccb" : "#e0e0e0";
      const color = isRed ? "#F44336" : "#666666";
      const className = battery.isCharging ? "charging" : "discharge";
      return (
        <div id="menu-content-collapsed-battery">
          <div
            id="menu-content-collapsed-battery-level"
            style={{ backgroundColor }}
            className={className}
          >
            <div style={{ backgroundColor: color, width: battery.level + "%", height: "100%" }} />
          </div>
          <Typography id="menu-content-collapsed-battery-text">
            {Math.round(battery.level) + "%"}
          </Typography>
        </div>
      );
    }
  }

  function renderEachApp(item: AppListSchema, index: number): JSX.Element {
    let className: string | undefined;
    if (windowState.openURL.includes(item.url)) {
      className = "active";
    }

    function handleClick() {
      openApp(item.url);
    }

    if (item.icon) {
      return (
        <Button
          id="menu-content-collapsed-applist-item"
          key={index}
          variant="text"
          onClick={handleClick}
          className={className}
        >
          <img src={item.icon} alt={item.name} draggable="false" />
        </Button>
      );
    } else {
      return (
        <Button
          id="menu-content-collapsed-applist-item"
          key={index}
          variant="text"
          onClick={handleClick}
          className={className}
        >
          <DefaultAppIcon />
        </Button>
      );
    }
  }

  function renderAppList(): JSX.Element {
    if (appList === null) {
      return (
        <div id="menu-content-collapsed-applist-flex">
          <LinearProgress id="menu-content-collapsed-loading" />
        </div>
      );
    } else if (appList.length === 0) {
      return (
        <div id="menu-content-collapsed-applist-flex">
          <Typography variant="h4">There is no App installed here</Typography>
        </div>
      );
    } else {
      return <div id="menu-content-collapsed-applist-flex">{appList.map(renderEachApp)}</div>;
    }
  }

  return (
    <div id="menu-content-collapsed" style={{ opacity: 0, pointerEvents: "none" }}>
      <div id="menu-content-collapsed-statusbar">
        {renderCellular()}
        <Typography id="menu-content-collapsed-time">
          {zeroify(time.hour)}:{zeroify(time.minute)} ∙ {time.dayOfWeek}, {time.month + " "}
          {ordinalize(time.dayOfMonth)}
        </Typography>
        {renderBattery()}
      </div>
      <Divider />
      <div id="menu-content-collapsed-applist">{renderAppList()}</div>
    </div>
  );
}
