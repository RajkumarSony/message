import React, { useState } from "react";
import { useNavigate, Link as reachLink ,Outlet} from "react-router-dom";
import { Box, Image, Button, Icon, Link } from "@chakra-ui/react";
import whatsapp from "../../assets/icons/Whatsapp.svg";
import whatsappIcon from "../../assets/icons/WhatsappIcon.svg";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const navigate = useNavigate();

  const [user, Setuser] = useState(
    localStorage.getItem("user") || auth.currentUser
  );

  const logOut = () => {
    signOut(auth).then(() => {
      Setuser(false);
      localStorage.removeItem("user");

      navigate("/auth/login");
    });
  };
  const login = () => {
    //   signInWithEmailAndPassword(auth,"nktech@gmail.com","password").then((userCredential)=>{
    navigate("/auth/login");
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      Setuser(true); // ...
    } else {
      Setuser(false);
    }
  });
  return (
    <>
    <Box
      position={{ md: "sticky", sm: "relative" }}
      boxSizing="content-box"
      h={{ md: "74px", lg: "91px", sm: "61px" }}
      pb={{ sm: "61px", md: "0" }}
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
        pl={{ md: "2rem", sm: "0.5rem" }}
        pr={{ md: "2rem", sm: "0.5rem" }}
        maxW={{ md: "1050px", sm: "100%" }}
        flexDirection="row"
        color="white"
        lineHeight="26px"
        width={{ md: "100%", sm: "90%" }}
        alignItems="center"
        justifyContent={{ md: "space-between", sm: "flex-end" }}
      >
        {/* <Icon d={{md:"none"}} alignSelf="flex-end" as={GiHamburgerMenu} /> */}
        <Box d="flex" width="80%" alignItems="center">
          <Box w="100%" d={{ lg: "block", sm: "none" }}>
            <Link
              as={reachLink}
              to="/"
            >
              <Image
                
                src={whatsapp}
                alt="Brand Logo"
                h={{ md: "auto" }}
              />
            </Link>
          </Box>
          <Box  d={{lg:"none",sm:"block"}}
              position={{ md: "sticky", sm: "absolute" }}
              left={{ sm: "50%", md: "unset" }}
              top={{ sm: "64px", md: "unset" }}
              transform={{ sm: "translateX(-50%)", md: "unset" }}>
            <Link as={reachLink} to="/">
              <Image
               
                src={whatsappIcon}
                alt="Brand Logo"
                w="auto"
                h={{ md: "auto", sm: "77px" }}
              />
            </Link>
          </Box>
        </Box>
        <Box
          d="flex"
          minW={{ md: "90%" }}
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box
            d={{ md: "flex", sm: "none" }}
            alignItems="center"
            justifyContent="space-evenly"
            flexGrow="1"
          >
            <Link as={reachLink} to="/web">
              WHATSAPP WEB
            </Link>

            <Link as={reachLink} to="/features">
              FEATURES
            </Link>

            <Link as={reachLink} to="/download">
              DOWNLOAD
            </Link>

            <Link as={reachLink} to="/security">
              SECURITY
            </Link>

            <Link as={reachLink} to="/help-center">
              HELP CENTER
            </Link>
          </Box>

          <Button
            d={{ sm: "none", md: "inline-block" }}
            colorScheme="transparent"
            onClick={user ? logOut : login}
            variant="ghost"
          >
            <Icon
              style={{ padding: "0 4px", fontSize: "28", fontWeight: "bold" }}
              as={user ? AiOutlineLogout : AiOutlineLogin}
            />
          </Button>
          <Box
            fontSize={25}
            fontWeight={500}
            lineHeight="120%"
            h="16px"
            d={{ md: "none" }}
          >
            <Icon cursor="pointer" as={GiHamburgerMenu} />
          </Box>
        </Box>
      </Box>

      {/* </Flex> */}
    </Box>
    <Outlet/>
    </>
  );
}
export default Navbar;
