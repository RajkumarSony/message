import React from "react";
import { Box, Avatar } from "@chakra-ui/react";
export default function Contact(props) {

  return (
    <Box h="80px" backgroundColor="white" onClick={props.onClick} cursor="pointer"  d="flex" >
      <Avatar my={3} mx={2}  name={props.name} cursor="pointer" size="lg" src={props.photoURL} />
      <Box mt={4} flexDirection="column" d="flex" width="90%" h="80%" style={{borderBottom:"1px solid rgba(32,32,23,0.23"}}>
          <Box>

<span style={{fontWeight:"bold",fontSize:"20px",lineHeight:"30px",width:"85%"}}>{props.name||props.Number}</span>
          </Box>
          <Box h={23} style={{overflow: 'hidden'}}>
    <span style={{color:"grey",width:"85%"}}>{props.message|| ""}</span>
          </Box>

      </Box>
    </Box>
  );
}
