import React, { useState, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/root/Navbar";
import { Button, useColorMode } from "@chakra-ui/react";
import Home from "./Pages/Home";
import WebMid from "./Pages/webMid";
import Features from "./Pages/Features";
import HelpCenter from "./Pages/HelpCenter";
import Security from "./Pages/security";
import NotFound from "./Pages/NotFound";
import "@fontsource/roboto";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./style.css";
import ReactPWAInstallProvider from "react-pwa-install";
import * as serviceWorker from "./serviceWorkerRegistration";
import { useSnackbar } from "notistack";

function App() {
  const { colorMode } = useColorMode();
  const [newVersion, setNewVersion] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let bar = document.getElementById("statusbar");
    bar.content = colorMode === "light" ? "#05c2c8" : "#19263a";
  }, [colorMode]);

  useEffect(() => {
    const onServiceWorkerUpdate = (registration) => {
      setWaitingWorker(registration && registration.waiting);
      setNewVersion(true);
    };

    const updateServiceWorker = () => {
      waitingWorker && waitingWorker.postMessage({ type: "SKIP_WAITING" });
      setNewVersion(false);
      window.location.reload();
    };
    serviceWorker.register({ onUpdate: onServiceWorkerUpdate });
    const refreshAction = (key) => {
      //render the snackbar button
      return (
        <Fragment>
          <Button
            className="snackbar-button"
            size="small"
            variant="outline"
            backgroundColor="#43a047"
            color="white"
            _hover={{
              backgroundColor: "#43a047",
              color: "white",
            }}
            _active={{
              backgroundColor: "#43a047",
              color: "white",
            }}
            onClick={updateServiceWorker}
          >
            {"update"}
          </Button>
        </Fragment>
      );
    };

    if (newVersion) {
      //show snackbar with refresh button
      enqueueSnackbar("A new version is Avalible", {
        persist: true,
        variant: "success",
        action: refreshAction(),
      });
    }
  }, [newVersion, enqueueSnackbar, waitingWorker]);

  return (
    // wraph the app in ChkraProvider to use Chakra element inside it
    <>
      {/* ReactPWAInstallProvider to use custom app install */}
      <ReactPWAInstallProvider>
        <Router>
          {/*  */}
          <Routes>
            {/* Navbar Shows on every page inside this Route */}
            <Route path="/" element={<Navbar />}>
              {/* Sub Rotues of / */}
              <Route index element={<Home />} />
              <Route path={"features"} element={<Features />} />
              <Route path="security" element={<Security />} />
              <Route path="help-center" element={<HelpCenter />} />
              <Route path="auth">
                {/* Sub Routes of auth */}
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* Outside the "/" route so no navbar visible on this page or any other page outside the "/" route */}
            <Route path="/web" element={<WebMid />} />
          </Routes>
        </Router>
      </ReactPWAInstallProvider>
    </>
  );
}

export default App;
