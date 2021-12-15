import React ,{useState} from "react";
import SplitPane, { Pane } from "react-split-pane";
import Contact from "../components/Web/Contact";
import Messanger from "../components/Web/Messanger";
import ContactNav from "../components/Web/ContactNav";
import MessageNav from "../components/Web/MessageNav";
import { Box } from "@chakra-ui/react";
import "./Pane.css";
import data from "./data.json";
import { Navigate } from "react-router-dom";


export default function Web() {
  const [Mnav, setMnav] = useState(
    {
      src:"",
      name:"",
      Uid:""
    }
  )
const user=localStorage.getItem("user");

if(user){
  return (
    <SplitPane
      m={0}
      minSize={350}
      maxSize={450}
      defaultSize="400px"
      style={{ height: "100vh", overflow: "hidden" }}
      split="vertical"
    >
      <Pane className="Resizer" m={0} borderRight="1px solid gray" zIndex="1000">
        <SplitPane
          split="horizontal"
          defaultSize={58}
          minSize={50}
          maxSize={50}
        >
          <Pane className="Resizer" d="flex" h="100%" w="100%">
            <ContactNav  src="https://scontent.fluh1-1.fna.fbcdn.net/v/t39.30808-1/p320x320/250949140_351112833438862_7310170090557817553_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_ohc=o_GIeAh8-44AX_uCzQC&_nc_ht=scontent.fluh1-1.fna&oh=ddd72d44fb4eb478a70711276b514b6c&oe=61BBAACD" />
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
                return <Contact onClick={()=>{
                  setMnav({
                    src:info.ProfileImg,
                    name:info.Name
                  })
                }}  {...info} key={index} />;
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
          <Pane backgroundColor="white" className="Resizer" d="flex" h="100%" w="100%">
            <MessageNav {...Mnav}  />
          </Pane>
          <Pane className="Resizer" top={20}  >
            <Box h="90vh">
              
            <Messanger />
            </Box>
          </Pane>
        </SplitPane>
      </Pane>
    </SplitPane>
  );}
  return <Navigate to="/"/>
}
