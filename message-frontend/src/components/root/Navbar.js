import React, { useEffect, useState } from "react";
import { useNavigate, Link as reachLink, Outlet } from "react-router-dom";
import { Box, Image, Button, Icon, Link, Stack } from "@chakra-ui/react";
import messageHubLogo from "../../assets/icons/iconwhite.png";
import messageHubLogoSmall from "../../assets/icons/iconmessage.png";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import axios from "axios";
import { useReactPWAInstall } from "react-pwa-install";
import logo from "../../assets/icons/mdpi.png";
function Navbar(props) {
  const navigate = useNavigate();
  const [isHome, SetisHome] = useState(true);
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const handleInstall = () => {
    pwaInstall({
      title: "Install Message Hub ",
      logo: logo,

      description:
        "Simple. Secure. Reliable messaging. With Message Hub, you'll get fast, simple, secure messaging for free*, available on the web all over the world.",
    }).catch(() => {
      console.log("Install cancelled");
    });
  };
  const [user, Setuser] = useState(
    localStorage.getItem("user") || auth.currentUser
  );
  const [smNav, setSmNav] = useState(false); // Handle Hamburger on Small device navbar
  const logOut = () => {
    // Ṣignout user from the firebase auth account
    signOut(auth).then(() => {
      Setuser(false);
      // Request to clear databaekey and session id and destroy the session after logout
      axios
        .post(
          "/session/logout",
          { reqest: "logout" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          localStorage.removeItem("user");
          navigate("/auth/login");
        });
    });
  };
  const smLogOut = () => {
    signOut(auth).then(() => {
      // Ṣignout user from the firebase auth account
      Setuser(false);
      // Request to clear databaekey and session id and destroy the session after logout on small device
      axios
        .post(
          "/session/logout",
          { reqest: "logout" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          localStorage.removeItem("user");
          navigate("/auth/login");
          handleHamburger();
        });
    });
  };
  const login = () => {
    // Handel Login BUton redirect page
    navigate("/auth/login");
  };
  const smLogin = () => {
    // Handel Login BUton redirect page
    navigate("/auth/login");
    handleHamburger();
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        Setuser(true); // ...
      } else {
        Setuser(false);
      }
    });
  }, []);
  const handleHamburger = () => {
    setSmNav(!smNav);
  };
  return (
    <>
      <Box
        position={{ md: "sticky", sm: "relative" }}
        boxSizing="content-box"
        h={{ md: "74px", lg: "91px", sm: "61px" }}
        pb={{ sm: "61px", md: "0" }}
        d="flex"
        flexDirection="row"
        backgroundColor="#05c2c8"
        // maxW="100%"
        minW="100%"
        justifyContent="center"
        alignItems="center"
        zIndex={1}
      >
        <Box
          d="flex"
          pl={{ md: "1.2rem", sm: "0.5rem" }}
          pr={{ md: "2rem", sm: "0.5rem" }}
          maxW={{ md: "1050px", sm: "100%" }}
          flexDirection="row"
          color="white"
          lineHeight="26px"
          width={{ md: "100%", sm: "90%" }}
          alignItems="center"
          justifyContent={{ md: "space-between", sm: "flex-end" }}
        >
          {/* <Icon d={{md:"none"}} alignSelf="flex-end" as={MdOutlineMenu} /> */}
          <Box d="flex" width="100%" alignItems="center">
            <Box w={{ md: "210px" }} d={{ lg: "block", sm: "none" }}>
              <Link as={reachLink} to="/">
                <Image
                  src={messageHubLogo}
                  alt="Brand Logo"
                  h={{ md: "55px" }}
                  w={{ md: "100%" }}
                />
              </Link>
            </Box>
            <Box
              d={{ lg: "none", sm: "block" }}
              position={{ md: "sticky", sm: isHome ? "absolute" : "sticky" }}
              left={{ sm: "50%", md: "unset" }}
              top={{ sm: "64px", md: "unset" }}
              transform={{
                sm: isHome ? "translateX(-50%)" : "none",
                md: "unset",
              }}
            >
              <Link as={reachLink} to="/">
                <Image
                  src={messageHubLogoSmall}
                  alt="Brand Logo"
                  w="auto"
                  h={{ md: "50px", sm: isHome ? "77px" : "40px" }}
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
                CHATS
              </Link>

              <Link as={reachLink} to="/features">
                FEATURES
              </Link>

              {supported() && !isInstalled() &&<Button colorScheme="transparent" onClick={handleInstall} fontWeight="500" type="link" variant="ghost">
                DOWNLOAD
              </Button>}

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
              h="fit-content"
              d={{ md: "none" }}
            >
              <Button
                cursor="pointer"
                colorScheme="transparent"
                variant="ghost"
                onClick={handleHamburger}
                h="40px"
                w="40px"
              >
                <Icon
                  h="30px"
                  w="30px"
                  lineHeight="120%"
                  fontWeight="700"
                  fontSize="16px"
                  as={MdOutlineMenu}
                />
              </Button>
              <Box
                py="56px"
                position="fixed"
                right={smNav ? "0" : "-100%"}
                zIndex={3}
                boxSizing="border-box"
                backgroundColor="#dc27cd"
                h="100%"
                top="0"
                w="100%"
                overflowX="hidden"
                overflowY="auto"
                transition="right 0.4s ease-in-out"
              >
                <Image
                  cursor="pointer"
                  src={messageHubLogoSmall}
                  alt="Brand Logo"
                  h="40px"
                  left="24px"
                  position="absolute"
                  w="40px"
                  top="24px"
                />
                <Button
                  cursor="pointer"
                  colorScheme="transparent"
                  variant="ghost"
                  h="36px"
                  right="24px"
                  position="absolute"
                  w="36px"
                  top="24px"
                  onClick={handleHamburger}
                  lineHeight="120%"
                  fontWeight="500"
                  fontSize="16pc"
                >
                  <Icon
                    h="30px"
                    w="30px"
                    lineHeight="120%"
                    fontWeight="700"
                    fontSize="16px"
                    as={MdClose}
                  />
                </Button>
                <Stack
                  color="white"
                  fontSize="16px"
                  lineHeight="26px"
                  fontWeight="400"
                  pt="32px"
                  my="0"
                  mx="auto"
                  w="80%"
                >
                  <Box
                    onClick={handleHamburger}
                    borderBottom="1px solid #e359ea"
                    m={0}
                    py="16px"
                  >
                    <Link as={reachLink} to="/web">
                      CHATS
                    </Link>
                  </Box>
                  <Box
                    onClick={handleHamburger}
                    borderBottom="1px solid #e359ea"
                    m={0}
                    py="16px"
                  >
                    <Link as={reachLink} to="/features">
                      FEATURES
                    </Link>
                  </Box>
                  <Box
                    onClick={handleHamburger}
                    borderBottom="1px solid #e359ea"
                    m={0}
                    py="16px"
                  >
                    <Link as={reachLink} to="/security">
                      SECURITY
                    </Link>
                  </Box>
                  <Box
                    onClick={handleHamburger}
                    borderBottom="1px solid #e359ea"
                    m={0}
                    py="16px"
                  >
                    <Link as={reachLink} to="/help-center">
                      HELP CENTER
                    </Link>
                  </Box>
                  <Box m={0} py="16px">
                    <Box onClick={user ? smLogOut : smLogin} variant="ghost">
                      <Icon
                        style={{
                          padding: "0 4px",
                          fontSize: "28",
                          fontWeight: "bold",
                        }}
                        as={user ? AiOutlineLogout : AiOutlineLogin}
                      />
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* </Flex> */}
      </Box>
      <Box
        overflowY={{ md: "auto" }}
        css={{
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            width: "14px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#05c2c8",
            borderRadius: "34px",
          },
        }}
        h={{ md: "83vh" }}
      >
        <Outlet context={[isHome, SetisHome]} />
      </Box>
    </>
  );
}
export default Navbar;
