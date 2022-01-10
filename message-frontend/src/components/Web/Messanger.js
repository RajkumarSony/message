import React, { useState ,useEffect,useRef} from "react";
import { Box, Textarea, Icon ,Button} from "@chakra-ui/react";
import { MdSend, MdMic,MdOutlineEmojiEmotions } from "react-icons/md";
import {TiAttachmentOutline} from "react-icons/ti"

import {auth,db} from "../../FirebaseConfig"
import axios from "axios";
import {onValue,ref} from "firebase/database"


export default function Messanger(props) {

  const [micIcon, setMicIcon] = useState(true);
 const [data, setData] = useState()
 const [loading, setLoading] = useState(false)
 
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
 const  handleSubmit= ()=>{
   if(Val!==""){
  setLoading(true)
   axios.post(
    "/sendmessage",
    {
      message: Val,
      Recipetuid:props.uid,
      uid:auth.currentUser.uid
    },
    {
      headers: {
        authorization: auth.currentUser.accessToken,
        "Content-Type": "application/json",
      },
    }
  ).then(res=>{
   if(res.status===201){
    setLoading(false)

   }
  }).catch(error=>{
    setLoading(false)
  })

    setVal("");
    setMicIcon(true);
   }
 }
 
 const handleKeyDown=(event)=>{
  if ((event.keyCode === 10 || event.keyCode === 13) && event.ctrlKey){
    handleSubmit()
  }
 }
 const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [data]);

useEffect(() => {
    const contactsRef =  ref(db, `${auth.currentUser.uid}/chats/${props.uid}`);
    onValue(
      contactsRef,
      (datax) => {
        if( datax.hasChildren()){
          let x = [];
          let count=0
          datax.forEach((contact) => {
            x.push({ ...contact.val() });
            count++
            if(count===datax.size){
              setData(x);
            }
          });
         
        }
        

      }
    );
  
}, [props.uid]);
  return (
    <Box h="100%" flexDirection="column" d="flex">
        <Box  overflowY="auto" d="flex" flexDirection="column" css={{
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      width: '6px',
      backgroundColor:"transparent"
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:"rgba(81, 231, 176, 0.234)",
      borderRadius: '34px',
    },
  }} backgroundColor="#20796f"  h="100%">
          {data?data.map((mes,index)=>{
            return (
             <Box h={8} key={index} m={5} d="flex" justifyContent={mes.send?"flex-end":"flex-start"} >
               <Box borderRadius={5}  d="felx" justifyContent="center" alignItems="center" backgroundColor={mes.send?"gray":"blue"} flexDirection="row" p={2} minW={6} w="fit-content">
                <p>{mes.message}</p>
               </Box>
             </Box>
            )
          }):(<>
          <Box>
          <Box h={8}  m={5} d="flex" justifyContent="center" >
               <Box borderRadius={5} color="white" d="felx" justifyContent="center" alignItems="center" backgroundColor="yellow.500" flexDirection="row" p={2} minW={6} w="fit-content">
                <p>No Message Start Chating Now</p>
               </Box>
             </Box>
          </Box>
          </>)}
          <Box ref={messagesEndRef}></Box>
        </Box>
      <Box  borderLeft="1px solid gray" backgroundColor="white"  alignItems="center" h={20} d="flex" flexDirection="row">
          <Icon w={8} h={8} color="rgba(150,150,150,1)" as={TiAttachmentOutline}/>
          <Icon w={8} h={8} color="rgba(100,100,100,0.3)" as={MdOutlineEmojiEmotions}/>
       
          <Box h={10} d='flex' borderRadius={40}   alignItems="center" overflowY="hidden" w="100%">
        <Textarea
          onChange={handelChange}
          onKeyDown={handleKeyDown}
          isDisabled={props.uid?false:true}
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
         <Button type={micIcon ? "button" : "submit"} isLoading={loading}  isDisabled={props.uid?false:true} onClick={micIcon? handleMic:handleSubmit} variant="ghost"><Icon color="rgba(18,140,126,1)" w={8} h={8} as={micIcon ? MdMic : MdSend} /></Button> 
     
         
       
      </Box>
    </Box>
  );
}
