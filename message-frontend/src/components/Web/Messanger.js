import React, { useState ,useRef} from "react";
import { Box, Textarea, Icon ,Button} from "@chakra-ui/react";
import { MdSend, MdMic,MdOutlineEmojiEmotions } from "react-icons/md";
import {TiAttachmentOutline} from "react-icons/ti"
import backgroundImg from "../../assets/Img/Background.png"
import {auth} from "../../FirebaseConfig"

const data=[
  {
    message:"hello",
    send:true
  },
  {
    message:"hi",
    send:false
  },
  {
    message:"who?",
    send:true

  }
  ,{
    message:"hello",
    send:true
  },
  {
    message:"hi",
    send:false
  },
  {
    message:"who?",
    send:true

  }
  ,{
    message:"hello",
    send:true
  },
  {
    message:"hi",
    send:false
  },
  {
    message:"who?",
    send:true

  }
  ,{
    message:"hello",
    send:true
  },
  {
    message:"hi",
    send:false
  },
  {
    message:"who?",
    send:true

  }
];
export default function Messanger(props) {
  const mesref=useRef(null)
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
 mesref.current?.scrollIntoView({ behavior: "smooth" })
  const handleMic=()=>{
console.log(Val)
  }
 const  handleSubmit= async()=>{
   if(Val!==""){
   mesref.current
   .scrollIntoView({ behavior: "smooth" })
   const token=await auth.currentUser.accessToken;
      props.socket.emit("SendMesaage",{message:Val,uid:auth.currentUser.uid,token:token});
   
    data.push({
      message:Val,
      send:true,
      // uid:auth.currentUser.uid
    })
    console.log(data)
    setVal("");
    setMicIcon(true);
   }
 }
 
 const handleKeyDown=(event)=>{
  if ((event.keyCode === 10 || event.keyCode === 13) && event.ctrlKey){
    handleSubmit()
  }
 }

  return (
    <Box h="100%" flexDirection="column" d="flex">
        <Box  overflowY="scroll" d="flex" flexDirection="column"  backgroundColor="white" backgroundImage={backgroundImg} h="100vh">
          {data.map((mes,index)=>{
            return (
             <Box h={8} key={index} m={5} d="flex" justifyContent={mes.send?"flex-end":"flex-start"} >
               <Box borderRadius={5}  d="felx" justifyContent="center" alignItems="center" backgroundColor={mes.send?"gray":"blue"} flexDirection="row" p={2} minW={6} w="fit-content">
                <p>{mes.message}</p>
               </Box>
             </Box>
            )
          })}
          <Box h={90} mt={20} ></Box>
        </Box>
      <Box  borderLeft="1px solid gray" backgroundColor="white"  alignItems="center" h={20} d="flex" flexDirection="row">
          <Icon w={8} h={8} color="rgba(150,150,150,1)" as={TiAttachmentOutline}/>
          <Icon w={8} h={8} color="rgba(100,100,100,0.3)" as={MdOutlineEmojiEmotions}/>
       
          <Box h={10} d='flex' borderRadius={40}   alignItems="center" overflowY="hidden" w="100%">
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
