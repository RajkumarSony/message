import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme, { colorConfig } from "./theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SnackbarProvider>
        <ColorModeScript initialColorMode={colorConfig.initialColorMode} />
        <App />
      </SnackbarProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
