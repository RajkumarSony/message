import React, { useState } from "react";
import Contact from "../components/Web/Contact";
import Messanger from "../components/Web/Messanger";
import ContactNav from "../components/Web/ContactNav";
import MessageNav from "../components/Web/MessageNav";
import { Box } from "@chakra-ui/react";
import data from "./data.json";
import { Navigate } from "react-router-dom";
import { auth } from "../FirebaseConfig";
import io from "socket.io-client";

export default function Web() {
  const [Mnav, setMnav] = useState({
    src: "",
    name: "",
    Uid: "",
  });
const [width, setWidth] = useState("100%")
const [xwidth, setXwidth] = useState("0%")
  if (auth.currentUser) {
    const token=auth.currentUser.accessToken
    const socket= io("http://localhost:5000", {
      extraHeaders: {
        token: token,
      }});

   const updateWidth=()=>{
     setWidth("100%")
     setXwidth("0%")
   }
   
    return (
    <Box
        d="flex"
        flexDirection="row"
        h="100vh"
        w="100vw"
        overflow="hidden"
      >
        <Box
          d="flex"
          flexDirection="column"
          h="100%"
          w={{md:"40%",sm:width,lg:"30%"}}
         
        >
          <Box w="100%"  h={{md:"10vh",sm:"15vh"}}>
            <ContactNav name={auth.currentUser.displayName}/>
          </Box>
          <Box h={{md:"90vh",sm:"85vh"}} overflowy="scroll">
            <Box
              style={{ height: "90vh", overflowY: "scroll" }}
              w="100%"
              overflowY="scroll"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {data.map((info, index) => {
                return (
                  <Contact
                    onClick={() => {
                      setMnav({
                        src: info.ProfileImg,
                        name: info.Name,
                      });
                      setWidth("0%")
                      setXwidth("100%")
                    }}
                    {...info}
                    key={index}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box h="100%" zIndex="1" w={{md:"60%",sm:xwidth,lg:"70%"}} backgroundColor="green">
          <Box w="100%"h={{md:"10vh",sm:"15vh"}}>
            <MessageNav updateWidth={updateWidth} {...Mnav}/>
          </Box>
          <Box h={{md:"90vh",sm:"85vh"}}  w="100%">
            <Messanger socket={socket}/>
          </Box>
        </Box>
      </Box>
    );
  }
  return <Navigate to="/auth/login" />;
}
