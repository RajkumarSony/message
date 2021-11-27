import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/root/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Pages/Home";
import Features from "./Pages/Features";
import Download from "./Pages/Download";
import HelpCenter from "./Pages/HelpCenter";
import Security from "./Pages/security";
import NotFound from "./Pages/NotFound";
import theme from "./theme";
import "@fontsource/roboto"
function App() {
  return (
    <ChakraProvider theme={theme}>


      <Router>


        <Navbar />
        
        <Routes>
          {["/home", "/", "/Home", "/index.html", "/index.js"].map((path, index) =>
            <Route path={path} element={<Home />} key={index} />
          )}
          <Route exact path={"/features"} element={<Features />} />
          {/* <Route exact path={"/about"} element={<About />} /> */}


          <Route exact path="/download" element={<Download />} />
          <Route exact path="/security" element={<Security />} />
          <Route exact path="/help-center" element={<HelpCenter />} />


          <Route path="*" element={<NotFound />} />
        </Routes>


      </Router>
    </ChakraProvider>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }
// function NotFound() {
//   return <h2>Not Found</h2>;
// }
export default App;
