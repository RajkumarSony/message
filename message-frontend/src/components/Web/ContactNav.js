import React from 'react'
import {BiMessageRoundedAdd} from "react-icons/bi"
import {Box,Avatar,Icon} from "@chakra-ui/react"


export default function ContactNav(props) {
   
    
    return (
        <Box d="flex" w="100%" alignItems="center" borderRight="1px solid #dc27cd" justifyContent="space-between" boxSizing='content-box' pb={{md:"5px"}} backgroundColor="#e359ea" h="100%">
            <Box ml={2} d="flex" alignItems="center" h="100%" >
           
        <Avatar onClick={props.profile} cursor="pointer"  src={props.src} name={props.name} />
            </Box>
            <Box d='flex' mr={3}  >
            
            <Icon color="white" fontSize={28} mr={3} onClick={props.contactList} as={BiMessageRoundedAdd}  cursor="pointer"/>
            </Box >
      </Box>
    )
} 
