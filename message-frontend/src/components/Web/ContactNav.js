import React from 'react'
import {AiOutlinePlusSquare} from "react-icons/ai"
import {IoMdArrowRoundBack} from "react-icons/io"
import {Box,Avatar,Icon} from "@chakra-ui/react"
import {useNavigate} from "react-router-dom"

export default function ContactNav() {
    const history=useNavigate()
    const handleBack=()=>{
        history(-1)
    }
    return (
        <Box d="flex" alignItems="center" backgroundColor="#128c7e" h="100%">
            <Icon color="white" fontSize={28} onClick={handleBack} as={IoMdArrowRoundBack}/>
        <Avatar />
            <Icon color="white" fontSize={28}  as={AiOutlinePlusSquare}/>
      </Box>
    )
}
