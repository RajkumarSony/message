import React from 'react'
import {AiOutlinePlusSquare,AiOutlineCloseSquare} from "react-icons/ai"
// import {IoMdArrowRoundBack} from "react-icons/io"
import {Box,Avatar,Icon} from "@chakra-ui/react"


export default function ContactNav(props) {
   
    
    return (
        <Box d="flex" w="100%" alignItems="center" justifyContent="space-between" boxSizing='content-box' pb={{md:"5px"}} backgroundColor="#128c7e" h="100%">
            <Box ml={2} d="flex" alignItems="center" h="100%" >
           
        <Avatar onClick={props.profile} cursor="pointer"  src={props.src} name={props.name} />
            </Box>
            <Icon color="white" cursor="pointer" onClick={props.popup} mr={3} fontSize={28}  as={!props.po?AiOutlinePlusSquare:AiOutlineCloseSquare}/>
      </Box>
    )
} 
