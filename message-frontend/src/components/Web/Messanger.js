import React, { useState } from "react";
import { Box, Textarea, Icon } from "@chakra-ui/react";
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
        <Box backgroundColor="white" backgroundImage="url(https://lh3.googleusercontent.com/SZ97RCEv5EVH6iMCDIdHeGJM_BNyHYcnRQ4EdK4V_VyVxLlQS8GY1U3xB8atEBH55OM)" h="100vh">
           {/* <Image src="https://lh3.googleusercontent.com/SZ97RCEv5EVH6iMCDIdHeGJM_BNyHYcnRQ4EdK4V_VyVxLlQS8GY1U3xB8atEBH55OM"/> */}
        </Box>
      <Box   borderRadius={10}  alignItems="center" h={20} d="flex" flexDirection="row">
          <Icon w={8} h={8} color="rgba(150,150,150,1)" as={TiAttachmentOutline}/>
          <Icon w={8} h={8} color="rgba(100,100,100,0.3)" as={MdOutlineEmojiEmotions}/>
          <Box h={10} d='flex' borderRadius={40}  alignItems="center" overflowY="hidden" w="100%">
        <Textarea
          onChange={handelChange}
          backgroundColor="rgba(100,100,100,0.3)"
        resize="none"
          placeholder="Type Message"
          color="black"
          pt={6}
          style={{ border: "1px solid white",width:"100%", }}
          align="center"
          css={{ 
            '&::-webkit-scrollbar': {
              display: "none",
            },
            "height":"10px",
          }}
          
          
          
        />
        </Box>
        <Icon color="rgba(18,140,126,1)" w={8} h={8} as={micIcon ? MdMic : MdSend} />
      </Box>
    </Box>
  );
}
