import React from "react";
import { Link } from "react-router-dom";
import { Flex, Spacer ,Input} from "@chakra-ui/react";
import {Box ,Image} from "@chakra-ui/react";
import whatsapp from "../../assets/icons/Whatsapp.svg"
import {BsGlobe} from "react-icons/bs"
import {MdArrowDropDown} from "react-icons/md";

function Navbar() {
  let marginright ="6%"
  return (
    <header style={{height:"91px",widht:"100%",border:"1px solid ",backgroundColor:"#128c7e"}}>
     <Flex flexDirection="row"  alignItems="center" style={{height:"100%",width:"100%"}}>
<Image ml="9%" mr="9%" width="15%" src={whatsapp} alt="Brand Logo" />
<Box  d="flex"  flexDirection="row" style={{color:"white",lineHeight:"26px" ,width:"90%",}}>
<Link style={{marginRight:marginright}} to="/">WHATSAPP WEB</Link>

<Link style={{marginRight:marginright}} to="/features">FEATURES</Link>


<Link style={{marginRight:marginright}} to="/download">DOWNLOAD</Link>

<Link style={{marginRight:marginright}} to="/security">SECURITY</Link>

<Link style={{marginRight:marginright}} to="/help-center">HELP CENTER</Link>
<Box  d="flex" flexDirection="row" style={{alignItems:"center",justifyContent:"space-evenly"}}><BsGlobe /><h5 style={{padding:"0 4px"}}>EN</h5><MdArrowDropDown/></Box>
</Box>
</Flex>
    </header>
      
    
  );
}
export default Navbar;
