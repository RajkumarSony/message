import React, { useState, Fragment,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/root/Navbar";
import { ChakraProvider,Button } from "@chakra-ui/react";
import Home from "./Pages/Home";
import WebMid from "./Pages/webMid";
import Features from "./Pages/Features";
import HelpCenter from "./Pages/HelpCenter";
import Security from "./Pages/security";
import NotFound from "./Pages/NotFound";
import theme from "./theme";
import "@fontsource/roboto";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./style.css";
import ReactPWAInstallProvider from "react-pwa-install";
import * as serviceWorker from "./serviceWorkerRegistration";
import { useSnackbar } from 'notistack';

function App() {
  const [newVersion, setNewVersion] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState({});
  const { enqueueSnackbar} = useSnackbar();

  const onServiceWorkerUpdate = (registration) => {
    setWaitingWorker(registration && registration.waiting);
    setNewVersion(true);
  };

  const updateServiceWorker = () => {
    waitingWorker && waitingWorker.postMessage({ type: "SKIP_WAITING" });
    setNewVersion(false);
    window.location.reload();
  };
  const refreshAction = (key) => {
    //render the snackbar button
    return (
      <Fragment>
        <Button
          className="snackbar-button"
          size="small"
          onClick={updateServiceWorker}
        >
          {"update"}
        </Button>
      </Fragment>
    );
  };

  useEffect(() => {
   
      serviceWorker.register({ onUpdate: onServiceWorkerUpdate });
    

    if (newVersion) {
      //show snackbar with refresh button
      enqueueSnackbar("A new version is Avalible", {
        persist: true,
        variant: "success",
        action: refreshAction(),
      });
    }
  }, [newVersion]);

  return (
    // wraph the app in ChkraProvider to use Chakra element inside it
    <ChakraProvider theme={theme}>
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
    </ChakraProvider>
  );
}

export default App;
