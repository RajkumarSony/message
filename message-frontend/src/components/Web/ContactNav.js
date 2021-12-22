import React from 'react'
import {AiOutlinePlusSquare} from "react-icons/ai"
// import {IoMdArrowRoundBack} from "react-icons/io"
import {Box,Avatar,Icon} from "@chakra-ui/react"


export default function ContactNav(props) {
   
    
    return (
        <Box d="flex" w="100%" alignItems="center" justifyContent="space-between" backgroundColor="#128c7e" h="100%">
            <Box ml={2} d="flex" alignItems="center" h="100%">
           
        <Avatar  src={props.src} name={props.name} />
            </Box>
            <Icon color="white" mr={3} fontSize={28}  as={AiOutlinePlusSquare}/>
      </Box>
    )
}
