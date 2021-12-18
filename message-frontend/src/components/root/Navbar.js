import React ,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import { Box, Image, Button, Icon } from "@chakra-ui/react";
import whatsapp from "../../assets/icons/Whatsapp.svg";
import {signOut,onAuthStateChanged} from "firebase/auth"
import {auth} from "../../FirebaseConfig"
import {AiOutlineLogin,AiOutlineLogout} from "react-icons/ai"


function Navbar() {
  const navigate=useNavigate();
  
  const [user, Setuser] = useState(localStorage.getItem('user') || auth.currentUser)
  
  const logOut=()=>{
    signOut(auth).then(()=>{
     Setuser(false)
     localStorage.removeItem("user")
     
     navigate("/auth/login")
    })
  }
  const login=()=>{
  //   signInWithEmailAndPassword(auth,"nktech@gmail.com","password").then((userCredential)=>{
    navigate("/auth/login")
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
Setuser(true)      // ...
    } else {
      Setuser(false) 
    }})
  return (
    // Header
    <Box
    position="fixed"
    top={0}
    
      h={{ lg: "91px", md: "74px" }}
      d="flex"
      flexDirection="row"
      backgroundColor="#128c7e"
      maxW="100%"
      minW="100%"
      justifyContent="center"
      alignItems="center"
      zIndex={1}
   
    >

      <Box
        d="flex"
        pr={{ md: "32px" }}
        pl={{ md: "32px" }}
        maxW={{ md: "1050px" }}
        flexDirection="row"
        color="white"
        lineHeight="26px"
        width="100%"
        alignItems="center"
        justifyContent="space=between"
    
      >
        <Box d="flex" w="80%" alignItems="center">
          <Box minW="160px">
            <Link to="/">
              <Image src={whatsapp} alt="Brand Logo" />
            </Link>
          </Box>
        </Box>
        <Box
          d="flex"
          minW={{ md: "90%", lg: "80%" }}
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box
            d="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexGrow="1"
          >
            <Link to="/web">WHATSAPP WEB</Link>

            <Link to="/features">FEATURES</Link>

            <Link to="/download">DOWNLOAD</Link>

            <Link to="/security">SECURITY</Link>

            <Link to="/help-center">HELP CENTER</Link>
          </Box>

          <Button
            colorScheme="transparent"
            onClick={user? logOut:login}
            variant ="ghost"
          >
            <Icon  style={{ padding: "0 4px" ,fontSize: "28",fontWeight: "bold" }} as={user?AiOutlineLogout:AiOutlineLogin}/>
          </Button>
        </Box>
      </Box>

      {/* </Flex> */}
    </Box>
  );
}
export default Navbar;
