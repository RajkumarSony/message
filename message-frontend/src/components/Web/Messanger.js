import React, { useState } from "react";
import { Box, Textarea, Icon ,Button} from "@chakra-ui/react";
import { MdSend, MdMic,MdOutlineEmojiEmotions } from "react-icons/md";
import {TiAttachmentOutline} from "react-icons/ti"
import io from "socket.io-client"
import backgroundImg from "../../assets/Img/Background.png"

const socket=io()
socket.connect()
// socket.on("connect")
export default function Messanger() {
  const [micIcon, setMicIcon] = useState(true);
  const [Val, setVal] = useState("")
  const handelChange = (event) => {
    setVal(event.target.value)
    if (event.target.value === "") {
      setMicIcon(true);
    } else {
      setMicIcon(false);
    }
  };

  const handleMic=()=>{
console.log(Val)
  }
 const handleSubmit=()=>{
   socket.emit("SendMesaage",{message:Val});
   setVal("");
   setMicIcon(true);
 }
 const handleKeyDown=(event)=>{
  if ((event.keyCode === 10 || event.keyCode === 13) && event.ctrlKey){
    handleSubmit()
  }
 }

  return (
    <Box h="100%" flexDirection="column" d="flex">
        <Box borderLeft="1px solid gray"  backgroundColor="white" backgroundImage={backgroundImg} h="100vh">
           {/* <Image src="https://lh3.googleusercontent.com/SZ97RCEv5EVH6iMCDIdHeGJM_BNyHYcnRQ4EdK4V_VyVxLlQS8GY1U3xB8atEBH55OM"/> */}
        </Box>
      <Box  borderLeft="1px solid gray"   alignItems="center" h={20} d="flex" flexDirection="row">
          <Icon w={8} h={8} color="rgba(150,150,150,1)" as={TiAttachmentOutline}/>
          <Icon w={8} h={8} color="rgba(100,100,100,0.3)" as={MdOutlineEmojiEmotions}/>
       
          <Box h={10} d='flex' borderRadius={40}  alignItems="center" overflowY="hidden" w="100%">
        <Textarea
          onChange={handelChange}
          onKeyDown={handleKeyDown}
          backgroundColor="rgba(100,100,100,0.3)"
        resize="none"
          placeholder="Type Message"
          color="black"
          pt={6}
          style={{ border: "1px solid white",width:"100%", }}
          align="center"
          value={Val}
          css={{ 
            '&::-webkit-scrollbar': {
              display: "none",
            },
            "height":"10px",
          }}
          
          />
        </Box>
         <Button type={micIcon ? "button" : "submit"} onClick={micIcon? handleMic:handleSubmit} variant="ghost"><Icon color="rgba(18,140,126,1)" w={8} h={8} as={micIcon ? MdMic : MdSend} /></Button> 
     
         
       
      </Box>
    </Box>
  );
}
