import React from 'react'
import {Image, Box,Text, Stack,Link ,Icon} from "@chakra-ui/react";
import Phone from "../../assets/Img/Phone.png";
import PhoneHalf from "../../assets/Img/halfPhone.png";
import { Link as reachLink } from "react-router-dom";
import {AiFillAndroid,AiFillApple} from "react-icons/ai"
import {MdMonitor} from "react-icons/md"
import {IoIosArrowForward} from "react-icons/io"
export default function Header() {
    return (
        <Box >
          <Box color={{md:"black"}}>
      <Box pb={{md:"56px",sm:"0px"}} color={{sm:"#fff",md:"#1c1e21"}} backgroundColor={{sm:"#128c7e",md:"white"}} pt={"56px"} textAlign={{md:"left",sm:"center"}} >
        <Box  mx="auto" width="100%" maxW={{xl:"788px",sm:"80%"}} >
        <Box flexDirection={{md:"row",sm:"column"}} d="flex" justifyContent="space-between" textAlign={{md:"left",sm:"center"}}>
          <Box d="flex" alignItems="center" flexWrap="wrap" width={{md:"50%",sm:"100%"}}  >
            <Box>
              <Box maxW="100%" pb={{sm:"16px",md:"32px"}}>
            <Box fontSize={{md:"33px",sm:"24px"}} lineHeight={{md:"43px",sm:"31px"}} pb={{md:"16px",sm:"8px"}}>
            <h2 >Simple. Secure. </h2>
           <h2> Reliable messaging.</h2>
           </Box>
           <Text fontSize={{md:"18px",sm:"16px"}} lineHeight="26px" my="1em" >
           With WhatsApp, you'll get fast, simple, secure messaging and calling for <span>free<sup>*</sup>,</span> available on  phones all over the world.
           </Text>
           <Text fontSize="16px" d={{md:"block",sm:"none"}} lineHeight="21px" color="#5e5e5e"><sup>*</sup> Data charges may apply. Contact your provider for  details.</Text>
           </Box>
           <Box fontWeight={400}>
          
             <Link borderRadius={40 } lineHeight="120%" mb="40px" p="1rem 2rem" fontSize="16px" cursor="pointer" variant="solid" backgroundColor="#075e55" color="white" d={{sm:"inline-block",md:"none"}}>DOWNLOAD NOW</Link>
             <Stack d={{sm:'none',md:"flex"}} color={{md:"#1CB39B"}} fontSize={{md:"18px"}} lineHeight={{md:"26px"}}>
             <Box pb={{md:"1rem"}} m={0}> <Link  d="inline-flex" as={reachLink} alignItems="center" justifyContent="center" flexDirection="row"  to=""><Icon mr="1rem" as={AiFillAndroid}/> Android <Icon mx="0.5rem" as={IoIosArrowForward} /> </Link></Box>
             <Box pb={{md:"1rem"}} m={0}><Link  d="inline-flex" as={reachLink} alignItems="center"  flexDirection="row" to=""><Icon mr="1rem" as={AiFillApple}/>iPhone<Icon mx="0.5rem" as={IoIosArrowForward} /> </Link></Box>
             <Box pb={{md:"1rem"}} m={0}><Link d="inline-flex" alignItems="center" justifyContent="center" flexDirection="row" as={reachLink} to=""><Icon mr="1rem" as={MdMonitor}/>Mac or  Windows PC <Icon mx="0.5rem" as={IoIosArrowForward}/>	</Link></Box>
             </Stack>
           </Box>
          </Box></Box>
          <Box d="flex" wrap="wrap" width={{md:"40.66%",sm:"100%"}} alignItems="center">
            <Box h="auto" mx="auto" maxWidth={304}>
            <Image d={{md:"block",sm:"none"}} maxW="100%" src={Phone} alt="Phone Image" />
            <Image d={{md:"none"}} maxW="100%" src={PhoneHalf} alt="Phone Image" />
          </Box></Box>
        </Box>
      </Box>
      </Box>
    </Box>
    </Box>
    )
}
