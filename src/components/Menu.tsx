import "./Menu.sass";

import React from "react";
import { useRecoilState } from "recoil";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowIcon from "@mui/icons-material/ExpandLess";

import MenuCollapnessMemory from "../memory/MenuCollapness";
import WindowMemory from "../memory/Window";
import MenuExpanded from "./MenuExpanded";
import MenuCollapsed from "./MenuCollapsed";

export default function Menu(): JSX.Element {
  // 0.0 when open, 1.0 when collapsed
  const [collapness, setCollapness] = useRecoilState(MenuCollapnessMemory);
  const [windowState] = useRecoilState(WindowMemory);

  // On component loaded
  React.useEffect(() => {
    const menuElement = document.getElementById("menu");
    const menuContainerElement = document.getElementById("menu-container");
    const arrowElement = document.getElementById("menu-arrow") as SVGElement | null;
    const menuContentExpanded = document.getElementById("menu-content-expanded");
    const menuContentCollapsed = document.getElementById("menu-content-collapsed");

    function onScroll(event: Event) {
      if (!menuElement || !menuContainerElement) return;

      const currentCollapness = menuElement.scrollTop / (menuContainerElement.clientHeight - 104);
      setCollapness(currentCollapness);

      if (arrowElement) {
        if (currentCollapness > 0.5) {
          arrowElement.style.transform = "rotate(180deg)";
        } else {
          arrowElement.style.transform = "";
        }
      }

      if (menuContentExpanded) {
        if (currentCollapness > 0.9) {
          menuContentExpanded.style.opacity = "0";
          menuContentExpanded.style.pointerEvents = "none";
        } else {
          menuContentExpanded.style.opacity = "";
          menuContentExpanded.style.pointerEvents = "";
        }
      }

      if (menuContentCollapsed) {
        if (currentCollapness > 0.9) {
          menuContentCollapsed.style.opacity = "";
          menuContentCollapsed.style.pointerEvents = "";
        } else {
          menuContentCollapsed.style.opacity = "0";
          menuContentCollapsed.style.pointerEvents = "none";
        }
      }
    }

    function onPointerMove(event: PointerEvent | TouchEvent) {
      if (!menuElement || !menuContainerElement) return;

      const bottomY = menuContainerElement.clientHeight - menuElement.scrollTop - 16;
      const currentCollapness = menuElement.scrollTop / (menuContainerElement.clientHeight - 104);

      let cursorY: number;
      if (event instanceof TouchEvent) {
        const touch = event.touches.item(0);
        if (!touch) return;
        cursorY = touch.clientY;
      } else {
        cursorY = event.y;
      }

      if (cursorY > bottomY && currentCollapness > 0.75) {
        menuElement.scrollTop = menuElement.scrollTop - 16;
        menuElement.style.pointerEvents = "none";
      } else {
        menuElement.style.pointerEvents = "all";
      }
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchstart", onPointerMove);
    window.addEventListener("touchmove", onPointerMove);
    menuElement?.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      menuElement?.removeEventListener("scroll", onScroll);
    };
  }, [setCollapness]);

  function onArrowClick() {
    const menuElement = document.getElementById("menu");

    if (menuElement) {
      if (collapness > 0.5) {
        menuElement.scrollTop = 0;
      } else {
        menuElement.scrollTop = menuElement.scrollHeight;
      }
    }
  }

  function generateButtonDesc(): string {
    if (collapness > 0.5) {
      return "Open the drawer";
    } else {
      return "Close the drawer";
    }
  }

  return (
    <div id="menu">
      <Paper id="menu-container" elevation={4}>
        <div id="menu-content">
          <MenuExpanded />
          <MenuCollapsed />
        </div>
        <IconButton id="menu-arrow" title={generateButtonDesc()} onClick={onArrowClick}>
          <ArrowIcon />
        </IconButton>
      </Paper>
      <div
        id="menu-empty_space"
        className={windowState.openURL.length > 0 ? "snapable" : undefined}
        style={{ opacity: 1 - collapness }}
      />
    </div>
  );
}
