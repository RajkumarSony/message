import { createBreakpoints } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const breakpoints = createBreakpoints({
  sm: "100px",
  md: "768px",
  lg: "960px",
  xl: "1023px",
  "2xl":"1200",
  "3xl": "1536px",
});
const theme = extendTheme({
  breakpoints,
  fonts: {
    body:"roboto"
  },
});

export default theme;