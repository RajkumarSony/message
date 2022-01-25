import React from "react";
import { Box,Icon,Text } from "@chakra-ui/react";

export default function Card(props) {
    return(
        <Box h="300px" mx="10px" mb="5px" backgroundColor={props.bgc}  borderRadius="12px" w="250px">
       <Text fontSize="16px" lineHeight="34px" fontFamily="Roboto" textAlign="center" letterSpacing={2} fontWeight="700" color="#5e5e5e">{props.name}</Text>
       <Box d="flex" justifyContent="center" h="40px" mb="5px" >
<Box d="flex" justifyContent="center" alignItems="center" h="60px" w="60px" p="5px" borderRadius="50%" backgroundColor={props.iconBgColor}>

       <Icon color={props.iconColor} h="40px" w="40px" as={props.icon}/>
</Box>
       </Box>
       <Box mt="23px">

       {props.text()}
       </Box>
    </Box>
    )
}