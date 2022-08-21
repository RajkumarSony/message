import { useColorMode } from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import androidDark from "./assets/Img/androidDark.png";
import androidLight from "./assets/Img/androidLight.png";
import iphoneDark from "./assets/Img/iphoneDark.png";
import iphoneLight from "./assets/Img/iphoneLight.png";

function useThemeConfig() {
  const { colorMode, toggleColorMode } = useColorMode();

  const toggleColor = () => {
    toggleColorMode();
    let bar = document.getElementById("statusbar");
    bar.content = colorMode === "light" ? "#05c2c8" : "#19263a";
  };

  const config = {
    colorMode: colorMode === "light" ? "Toggle Dark Mode" : "Toggle Light Mode",
    navBg: colorMode === "light" ? "#05c2c8" : "#19263a",
    scrollTrack: colorMode === "light" ? "white" : "#19263a",
    scrollTrackThumb: colorMode === "light" ? "#05c2c8" : "#295599",
    hHeadermd: colorMode === "light" ? "white" : "#19263a",
    contactBg: colorMode === "light" ? "white" : "#19263a",
    IconColor: colorMode === "light" ? "#718096" : "#E2E8F0",
    border: colorMode === "light" ? "1px solid #05c2c8 " : "1px solid #0e2e5e",
    inBorder: colorMode === "light" ? "black" : "white",
    borderRn: colorMode === "light" ? "1px solid #70ccf6" : "1px solid #0e2e5e",
    ContactBorder:
      colorMode === "light"
        ? "1px solid rgba(32,32,23,0.23)"
        : "2px solid #0e2e5e",
    mesBg: colorMode === "light" ? "ghostwhite" : "#1a202c",
    chatL: colorMode === "light" ? "#f0d1d1" : "#2c313d",
    chatR: colorMode === "light" ? "#a2d7fc" : "#455ba2",
    inputBg: colorMode === "light" ? "white" : "#02122a",
    hColormd: colorMode === "light" ? "#1c1e21" : "white",
    emoPic: colorMode === "light" ? "light" : "dark",
    Icon: colorMode === "light" ? MdDarkMode : MdLightMode,
    img: colorMode === "light" ? androidLight : androidDark,
    imgIphone: colorMode === "light" ? iphoneLight : iphoneDark,
  };
  return { config, toggleColor, colorMode };
}

export { useThemeConfig };
