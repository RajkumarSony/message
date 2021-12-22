import { Box, Avatar, Icon ,Text} from "@chakra-ui/react";
import React from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdArrowRoundBack} from "react-icons/io";
// import {useNavigate} from "react-router-dom"
export default function MessageNav(props) {
    // const history=useNavigate()
    const handleBack=()=>{
      props.updateWidth()
    }
  return (
    // <Box d="flex" h="100%" w="100%" backgroundColor="green">
      <Box
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="#e337d4"
        h="100%"
        zIndex="1000"
      >
        <Box ml={2} d="flex" alignItems="center" h="100%" >
          <Icon color="white" mr={2} onClick={handleBack} fontSize={28} as={IoMdArrowRoundBack} />
          <Avatar name={props.name} src={props.src} mr={2}/>
          <Text color="white" fontSize="xl">
             {props.name}
          </Text>
        </Box>
        <Icon color="white" mr={3} fontSize={28} as={AiTwotoneSetting} />
      </Box>
    // </Box>
  );
}
