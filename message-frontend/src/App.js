import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/root/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Pages/Home";
import Web from "./Pages/Web";
import Features from "./Pages/Features";
import Download from "./Pages/Download";
import HelpCenter from "./Pages/HelpCenter";
import Security from "./Pages/security";
import NotFound from "./Pages/NotFound";
import theme from "./theme";
import "@fontsource/roboto";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./style.css"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path={"features"} element={<Features />} />
            <Route path="download" element={<Download />} />
            <Route path="security" element={<Security />} />
            <Route path="help-center" element={<HelpCenter />} />
            <Route path="auth">
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/web" element={<Web />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
