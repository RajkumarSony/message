import React, { useState } from "react";
import { Box, Input, Icon } from "@chakra-ui/react";
import { MdSend, MdMic,MdOutlineEmojiEmotions } from "react-icons/md";
import {TiAttachmentOutline} from "react-icons/ti"
export default function Messanger() {
  const [micIcon, setMicIcon] = useState(true);
  const handelChange = (event) => {
    if (event.target.value === "") {
      setMicIcon(true);
    } else {
      setMicIcon(false);
    }
    console.log(event.target.value);
  };
  return (
    <Box h="100%" flexDirection="column" d="flex">
        <Box backgroundImage="url(https://lh3.googleusercontent.com/SZ97RCEv5EVH6iMCDIdHeGJM_BNyHYcnRQ4EdK4V_VyVxLlQS8GY1U3xB8atEBH55OM)" h="100vh">
           {/* <Image src="https://lh3.googleusercontent.com/SZ97RCEv5EVH6iMCDIdHeGJM_BNyHYcnRQ4EdK4V_VyVxLlQS8GY1U3xB8atEBH55OM"/> */}
        </Box>
      <Box   borderRadius={10}  alignItems="center" h={20} d="flex" flexDirection="row">
          <Icon w={8} h={8} color="rgba(150,150,150,1)" as={TiAttachmentOutline}/>
          <Icon w={8} h={8} color="rgba(100,100,100,0.3)" as={MdOutlineEmojiEmotions}/>
        <Input
          onChange={handelChange}
          backgroundColor="rgba(100,100,100,0.3)"
          borderRadius={40}
          placeHolder="Type Message"

          style={{ border: "1px solid white" }}
        />
        <Icon color="rgba(150,150,150,1)" w={8} h={8} as={micIcon ? MdMic : MdSend} />
      </Box>
    </Box>
  );
}
