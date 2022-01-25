import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Card from "../components/features/Card";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { FcMultipleDevices } from "react-icons/fc";
import { AiFillLock } from "react-icons/ai";

const MESSAGES = () => {
  return (
    <Box >
      <Text
        fontSize="18px"
        // lineHeight="34px"
        fontFamily="Roboto"
        textAlign="center"
        letterSpacing={2}
        fontWeight="700"
        color="#5e5e5e"
      >
        Simple, Reliable Messaging
      </Text>
      <Text  fontSize="14px"   letterSpacing={1} color="#5e5e5e" fontFamily="Roboto" textAlign="center" fontWeight="600">
      Message your friends and family for free*. Message Hub uses your phone's Internet connection to send messages so you can avoid SMS fees

      </Text>
    </Box>
  );
};
const SECURITY=()=>{
  return(
    <Box>
<Text
fontSize="16px"
// lineHeight="34px"
fontFamily="Roboto"
textAlign="center"
letterSpacing={2}
fontWeight="800"
color="#5e5e5e"
>
END-TO-END ENCRYPTION

</Text>
<Text textAlign="center" fontSize="18px" lineHeight="26px" fontWeight="700">
Security by Default
</Text>
<Text fontSize="14px"   letterSpacing={1} color="#5e5e5e" fontFamily="Roboto" textAlign="center" fontWeight="600">
Some of your personal moments are shared on MessageHub, which is why we use end-to-end encryption.your messages are secured so only you and the person you're communicating with can read or listen to them.
</Text>
    </Box>
  )
}
const onTheWeb=()=>{
  return(
    <Box>
      <Text
         fontSize="18px"
         // lineHeight="34px"
         fontFamily="Roboto"
         textAlign="center"
         letterSpacing={2}
         fontWeight="700"
         color="#5e5e5e"
      >Keep the Conversation Going
</Text>
<Text  fontSize="14px"   letterSpacing={1} color="#5e5e5e" fontFamily="Roboto" textAlign="center" fontWeight="600">
MessageHub is a Web-app so you can use it on any Devise with Internet Connection and a Web-Browser. This is a PWA so you can Install it on Dekstop as well as Mobile Phone.
</Text>
    </Box>
  )
}
export default function Features() {
  return (
    <Box backgroundColor="#1ee398" minW='100%' minH="100%">
      <Box d="flex" w="100%" justifyContent="center">
        <Text
          mt="20px"
          fontSize="38px"
          lineHeight="38px"
          color="white"
          fontFamily="Roboto"
          letterSpacing="2px"
        >
          <b>Features</b>
        </Text>
      </Box>
      <Box
        mt="40px"
        justifyContent="center"
        flexWrap="wrap"
        alignItems=""
        d="flex"
      >
        <Card
          icon={BsFillChatSquareTextFill}
          text={MESSAGES}
          iconColor="#00bfff"
          iconBgColor="#d0cfd0"
          name="MESSAGES"
          bgc="#fcf2c6"
        />
        <Card
         text={SECURITY}
          icon={AiFillLock}
          iconBgColor="#eaeb6b"
          name="SECURITY"
          bgc="#E7F0E4"
        />
        <Card
         text={onTheWeb}
          icon={FcMultipleDevices}
          iconBgColor="#6bebb2"
          name="ON THE WEB"
          bgc="#d6bcd9"
        />
      </Box>
    </Box>
  );
}
