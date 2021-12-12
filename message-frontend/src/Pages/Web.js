import React from "react";
import SplitPane, { Pane } from "react-split-pane";
import Contact from "../components/Web/Contact";
import Messanger from "../components/Web/Messanger";
import ContactNav from "../components/Web/ContactNav";
import { Box } from "@chakra-ui/react";

import "./Pane.css";
import data from "./data.json";
export default function Web() {
  return (
    <SplitPane
      m={0}
      minSize={350}
      maxSize={450}
      defaultSize="400px"
      style={{ height: "100vh", overflow: "hidden" }}
      split="vertical"
    >
      <Pane className="Resizer" m={0} zIndex="1000">
        <SplitPane
          split="horizontal"
          defaultSize={58}
          minSize={50}
          maxSize={50}
        >
          <Pane className="Resizer" d="flex" h="100%" w="100%">
           <ContactNav/>
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
                return <Contact {...info} key={index} />;
              })}
            </Box>
          </Pane>
        </SplitPane>
      </Pane>

      <Pane h="100%" m={0} className="Resizer" style={{ overflow: "hidden" }}>
        <Messanger />
      </Pane>
    </SplitPane>
  );
}
