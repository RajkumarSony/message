import React from 'react'
import { Flex, Image, Box } from "@chakra-ui/react";
import Phone from "../../assets/Img/Phone.png";
import { Link } from "react-router-dom";
import {AiFillAndroid,AiFillApple} from "react-icons/ai"
import {MdMonitor} from "react-icons/md"
import {IoIosArrowForward} from "react-icons/io"
export default function Header() {
    return (
        <Box style={{ margin: "5% 0" }}>
      <Box style={{margin:"0 15%",maxWidth: "788px",
    width: "100%",marginLeft: "auto",
    marginRight: "auto"}}>
        <Flex FlexDirection="row" width="100%" justifyContent="space-between">
          <Box  >
            <Box style={{fontSize: "33px",lineHeight:"43px",marginTop:"20%" ,marginBottom:"8%"}}>
            <h2 >Simple. Secure. </h2>
           <h2> Reliable messaging.</h2>
           </Box>
           <p style={{fontSize:"18px",lineHeight:"26px",marginBottom:"5%"}}>
           With WhatsApp, you'll get fast, simple, secure <br/> messaging and calling for free*, available on <br/> phones all over the world.
           </p>
           <p style={{fontSize:"16px",lineHeight:"21px",color:"#5e5e5e"}}>* Data charges may apply. Contact your provider for <br/> details.</p>
           <Box d="flex" style={{flexDirection:"column",marginTop:"10%",color:"#1cb39b",fontSize:"18px",lineHeight:"22px",width:"70%"}}>
             <Box d="flex" style={{flexDirection:"row",margin:"0 0 4% 0"}}><AiFillAndroid/><Link style={{margin:"0 12px"}} to="">Android </Link><IoIosArrowForward style={{fontWeight:"600"}}/></Box>
             <Box d="flex" style={{flexDirection:"row",margin:"4% 0"}}><AiFillApple/><Link style={{margin:"0 12px"}} to="">iPhone </Link><IoIosArrowForward style={{fontWeight:"600"}}/></Box>
             <Box d="flex" style={{flexDirection:"row",margin:"4% 0"}}><MdMonitor/><Link style={{margin:"0 12px"}} to="">Mac or  Windows PC 	</Link><IoIosArrowForward style={{fontWeight:"600"}}/></Box>

           </Box>
          </Box>
          <Box d="flex" style={{ width: "40.66%" ,alignItems:"center"}}>
            <Image width="100%" src={Phone} alt="Phone Image" />
          </Box>
        </Flex>
      </Box>
    </Box>
    )
}
