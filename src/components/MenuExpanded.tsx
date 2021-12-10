import "./MenuExpanded.sass";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import LocationIcon from "@mui/icons-material/Place";
import DefaultAppIcon from "@mui/icons-material/Article";
import { useRecoilState } from "recoil";

import LevelBar from "./LevelBar";
import QuickSettingButton from "./QuickSettingButton";
import AppListMemory, { AppListSchema } from "../memory/AppList";
import TimeMemory, { zeroify, ordinalize } from "../memory/Time";
import LocationMemory from "../memory/Location";
import CellularMemory from "../memory/Cellular";
import BatteryMemory, { distanceUnit } from "../memory/Battery";
import QuickSettingMemory from "../memory/QuickSetting";
import WindowMemory from "../memory/Window";
import MenuCollapnessMemory from "../memory/MenuCollapness";

import internetIcon from "../assets/quicksetting-internet.svg";
import accessPointIcon from "../assets/quicksetting-access_point.svg";
import bluetoothIcon from "../assets/quicksetting-bluetooth.svg";
import powersaveIcon from "../assets/quicksetting-powersave.svg";
import sonarIcon from "../assets/quicksetting-sonar.svg";
import doorIcon from "../assets/quicksetting-door.svg";
import screenOffIcon from "../assets/quicksetting-screen_off.svg";

import toggleInternet from "../actions/toggleInternet";
import toggleAccessPoint from "../actions/toggleAccessPoint";
import toggleBluetooth from "../actions/toggleBluetooth";
import togglePowerSave from "../actions/togglePowerSave";
import toggleSonar from "../actions/toggleSonar";
import toggleDoor from "../actions/toggleDoor";
import openApp from "../actions/openApp";

export default function MenuExpanded(): JSX.Element {
  const [time] = useRecoilState(TimeMemory);
  const [location] = useRecoilState(LocationMemory);
  const [cellular] = useRecoilState(CellularMemory);
  const [battery] = useRecoilState(BatteryMemory);
  const [quickSetting] = useRecoilState(QuickSettingMemory);
  const [appList] = useRecoilState(AppListMemory);
  const [windowState] = useRecoilState(WindowMemory);
  const [_collapness, setCollapness] = useRecoilState(MenuCollapnessMemory);

  let cellularMode: string;
  if (quickSetting.internet) {
    cellularMode = cellular.networkMode;
  } else {
    cellularMode = "";
  }

  let batteryPercent: number;
  if (battery.isAvailable && !battery.isBroken) {
    batteryPercent = battery.level;
  } else {
    batteryPercent = 0;
  }

  let remainingDistance: string;
  if (!battery.isAvailable) {
    remainingDistance = "disconnected";
  } else if (battery.isBroken) {
    remainingDistance = "malfunction";
  } else if (battery.distanceRemaining > 0) {
    remainingDistance = distanceUnit(battery.distanceRemaining) + " remaining";
  } else {
    remainingDistance = "";
  }

  let tempPercent = (battery.temperature * 100) / 80;

  function renderAppItem(eachItem: AppListSchema, index: number): JSX.Element {
    let icon: JSX.Element;
    if (eachItem.icon) {
      icon = <img src={eachItem.icon} alt={eachItem.name} draggable="false" />;
    } else {
      icon = <DefaultAppIcon />;
    }

    function handleClick() {
      if (windowState.openURL.includes(eachItem.url)) {
        const menuElement = document.getElementById("menu");
        if (menuElement) {
          menuElement.scrollTop = menuElement.clientHeight;
          setCollapness(1);
        }
      } else {
        openApp(eachItem.url);
      }
    }

    return (
      <Button
        id="menu-content-expanded-applist-item"
        key={index}
        variant="contained"
        size="large"
        color="inherit"
        startIcon={icon}
        onClick={handleClick}
      >
        {eachItem.name}
      </Button>
    );
  }

  function renderAppList(): JSX.Element {
    if (appList === null) {
      return (
        <div id="menu-content-expanded-applist-centered">
          <CircularProgress color="primary" />
        </div>
      );
    } else if (appList.length === 0) {
      return (
        <div id="menu-content-expanded-applist-centered">
          <Typography variant="h3" component="p">
            There is no App installed here
          </Typography>
        </div>
      );
    } else {
      return (
        <div id="menu-content-expanded-applist">
          <div id="menu-content-expanded-applist-flex">{appList.map(renderAppItem)}</div>
        </div>
      );
    }
  }

  return (
    <div id="menu-content-expanded">
      <div id="menu-content-expanded-header">
        <div id="menu-content-expanded-header-left">
          <Typography variant="h3" component="p">
            {zeroify(time.hour)}:{zeroify(time.minute)}:{zeroify(time.second)}
          </Typography>
          <Typography variant="body1">
            {time.dayOfWeek}, {time.month} {ordinalize(time.dayOfMonth)} {time.year}
          </Typography>
          <div id="menu-content-expanded-header-location">
            <LocationIcon id="menu-content-expanded-header-location-icon" color="action" />
            <div id="menu-content-expanded-header-location-text">
              <Typography variant="h6" component="p">
                {location.address}
              </Typography>
              <Typography variant="caption" component="p">
                {location.city}, {location.province}, {location.country}
              </Typography>
            </div>
          </div>
        </div>
        <div id="menu-content-expanded-header-vl" />
        <div id="menu-content-expanded-header-right">
          <LevelBar
            title={cellularMode}
            subtitle={cellular.carrierName}
            percentage={cellular.level}
          />
          <LevelBar
            title="Battery"
            subtitle={remainingDistance}
            percentage={batteryPercent}
            isDanger={batteryPercent < 20 || battery.isBroken}
          />
          <LevelBar
            title="Temp."
            subtitle={battery.temperature + "°C"}
            percentage={tempPercent}
            isDanger={battery.temperature >= 60}
          />
        </div>
      </div>
      <div id="menu-content-expanded-quicksetting">
        <div id="menu-content-expanded-quicksetting-flex">
          <QuickSettingButton
            label="Internet"
            icon={internetIcon}
            isEnabled={quickSetting.internet}
            isUpdating={quickSetting.updatingInternet}
            onClick={toggleInternet}
          />
          <QuickSettingButton
            label="Wi-Fi Router"
            icon={accessPointIcon}
            isEnabled={quickSetting.accessPoint}
            isUpdating={quickSetting.updatingAccessPoint}
            onClick={toggleAccessPoint}
          />
          <QuickSettingButton
            label="Bluetooth"
            icon={bluetoothIcon}
            isEnabled={quickSetting.bluetooth}
            isUpdating={quickSetting.updatingBluetooth}
            onClick={toggleBluetooth}
          />
          <QuickSettingButton
            label="Power Save"
            icon={powersaveIcon}
            isEnabled={quickSetting.powerSave}
            isUpdating={quickSetting.updatingPowerSave}
            onClick={togglePowerSave}
          />
          <QuickSettingButton
            label="Sonar"
            icon={sonarIcon}
            isEnabled={quickSetting.sonar}
            isUpdating={quickSetting.updatingSonar}
            onClick={toggleSonar}
          />
          <QuickSettingButton
            label="Automatic Door"
            icon={doorIcon}
            isEnabled={quickSetting.door}
            isUpdating={quickSetting.updatingDoor}
            onClick={toggleDoor}
          />
          <QuickSettingButton
            label="Screen Off"
            icon={screenOffIcon}
            isEnabled={false}
            isUpdating={false}
            onClick={() => {}}
          />
        </div>
      </div>
      <Divider />
      {renderAppList()}
    </div>
  );
}
