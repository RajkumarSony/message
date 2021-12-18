import React, { useState} from "react";
import SplitPane, { Pane } from "react-split-pane";
import Contact from "../components/Web/Contact";
import Messanger from "../components/Web/Messanger";
import ContactNav from "../components/Web/ContactNav";
import MessageNav from "../components/Web/MessageNav";
import { Box } from "@chakra-ui/react";
import "./Pane.css";
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

  if (auth.currentUser) {
    const token=auth.currentUser.accessToken
    const socket= io("http://localhost:5000", {
      extraHeaders: {
        token: token,
      }
  });
    const Disconnect = () => {
      socket.disconnect();
    };
    return (
      <SplitPane
        m={0}
        minSize={350}
        maxSize={450}
        defaultSize="400px"
        style={{ height: "100vh", overflow: "hidden" }}
        split="vertical"
      >
        <Pane
          className="Resizer"
          m={0}
          borderRight="1px solid gray"
          zIndex="1000"
        >
          <SplitPane
            split="horizontal"
            defaultSize={58}
            minSize={50}
            maxSize={50}
          >
            <Pane className="Resizer" d="flex" h="100%" w="100%">
              <ContactNav src={auth.currentUser.photoURL} name={auth.currentUser.displayName} />
            </Pane>
            <Pane className="Resizer" top={20}>
              <Box
                style={{ height: "90vh", overflowY: "scroll" }}
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
                      }}
                      {...info}
                      key={index}
                    />
                  );
                })}
              </Box>
            </Pane>
          </SplitPane>
        </Pane>

        <Pane h="100%" m={0} className="Resizer" style={{ overflow: "hidden" }}>
          <SplitPane
            split="horizontal"
            defaultSize={58}
            minSize={50}
            maxSize={50}
          >
            <Pane
              backgroundColor="white"
              className="Resizer"
              d="flex"
              h="100%"
              w="100%"
            >
              <MessageNav {...Mnav} discon={Disconnect} />
            </Pane>
            <Pane className="Resizer" top={20}>
              <Box h="90vh">
                <Messanger socket={socket} />
              </Box>
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    );
  }
  return <Navigate to="/auth/login" />;
}
