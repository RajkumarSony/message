import React, { useState } from "react";
import Contact from "../components/Web/Contact";
import Messanger from "../components/Web/Messanger";
import ContactNav from "../components/Web/ContactNav";
import axios from "axios";
import MessageNav from "../components/Web/MessageNav";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
// import data from "./data.json";
import { Navigate } from "react-router-dom";
import { auth, db } from "../FirebaseConfig";
import {  ref, get } from "firebase/database";

export default function Web() {
  const [Mnav, setMnav] = useState({
    src: "",
    name: "",
    Uid: "",
  });
  const [width, setWidth] = useState("100%");
  const [xwidth, setXwidth] = useState("0%");
  const [popupContact, setPopup] = useState(false);
  const [email, setEmail] = useState();
  const [popupProfile, setPopupProfile] = useState(false);
  const [data, setData] = useState();
const [uid, setUid] = useState(null)
  const updatePopup = () => {
    setPopup(!popupContact);
    setPopupProfile(false);
  };
  const updatePopupProfile = () => {
    setPopupProfile(!popupProfile);
    setPopup(false);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const uploadProfile = (event) => {
    event.preventDefault();
    console.log("clicked Upload");
  };
  const addContact = (event) => {
    event.preventDefault();
    axios
      .post(
        "/addcontact",
        {
          email: email,
        },
        {
          headers: {
            authorization: auth.currentUser.accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res, res.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (auth.currentUser) {
    const updateWidth = () => {
      setWidth("100%");
      setXwidth("0%");
    };
    const contactsRef = ref(db, `${auth.currentUser.uid}/contacts`);
    let x = [];
    get(contactsRef).then((data) => {
      data.forEach(data=>{

        x.push({
          ...data.val(),
        });
      })
      
      setData(x);
    });
    return (
      <Box
        d="flex"
        position="absolute"
        scroll="none"
        flexDirection="row"
        h="100vh"
        w="100vw"
        overflow="hidden"
      >
        <Box
          d="flex"
          flexDirection="column"
          h="100%"
          w={{ md: "40%", sm: width, lg: "30%" }}
        >
          <Box w="100%" h={{ md: "10vh", sm: "15vh" }}>
            <ContactNav
              popup={updatePopup}
              po={popupContact}
              profile={updatePopupProfile}
              name={auth.currentUser.displayName}
            />
          </Box>
          <Box h={{ md: "90vh", sm: "85vh" }} overflowy="scroll">
            <Box
              d={!popupContact && !popupProfile ? "block" : "none"}
              h="90vh"
              overflowY="scroll"
              w="100%"
              transition="display 1s fade"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              
                
              {data ? (
                data.map((info, index) => {
                  return (
                    <Contact
                      onClick={() => {
                        setMnav({
                          src: info.photoURL,
                          name: info.name,
                          
                        });
                        setUid(info.uid)
                        setWidth("0%");
                        setXwidth("100%");
                      }}
                      {...info}
                      key={index}
                    />
                  );
                })
              ) : (
                <>
                  <Box>No contacts add contacts to message</Box>
                </>
              )}
            </Box>
            <Box
              d={popupContact ? "block" : "none"}
              transition="display 1s fade"
              h="10px"
            >
              <Flex
                h="90vh"
                overflowY="bolck"
                mt="5vh"
                // align={"center"}
                justify={"center"}
                // bg={("gray.50", "gray.800")}
              >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
                  <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Add Contact</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                      to start messaging your friends ✌️
                    </Text>
                  </Stack>
                  <Box
                    rounded={"lg"}
                    // bg={("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                  >
                    <Stack spacing={4}>
                      <form onSubmit={addContact}>
                        <FormControl id="email">
                          <FormLabel>Email address</FormLabel>
                          <Input
                            onChange={handleEmail}
                            autoComplete="username"
                            type="email"
                          />
                        </FormControl>

                        <Stack pt={6} spacing={10}>
                          <Box d="flex" justifyContent="center">
                            <Button
                              w="50%"
                              type="submit"
                              bg={"blue.400"}
                              color={"white"}
                              _hover={{
                                bg: "blue.500",
                              }}
                            >
                              Add
                            </Button>
                          </Box>
                        </Stack>
                      </form>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </Box>
            <Box d={popupProfile ? "block" : "none"}>
              <Flex
                h="90vh"
                overflowY="bolck"
                mt="5vh"
                // align={"center"}
                justify={"center"}
                // bg={("gray.50", "gray.800")}
              >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
                  <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Add Contact</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                      to start messaging your friends ✌️
                    </Text>
                  </Stack>
                  <Box
                    rounded={"lg"}
                    // bg={("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                  >
                    <Stack spacing={4}>
                      <form onSubmit={uploadProfile}>
                        <FormControl id="profile">
                          <FormLabel>Profile Picture</FormLabel>
                          <Input
                            // onchange={handleEmail}

                            type="image"
                          />
                        </FormControl>

                        <Stack pt={6} spacing={10}>
                          <Box d="flex" justifyContent="center">
                            <Button
                              w="50%"
                              type="submit"
                              bg={"blue.400"}
                              color={"white"}
                              _hover={{
                                bg: "blue.500",
                              }}
                            >
                              Add
                            </Button>
                          </Box>
                        </Stack>
                      </form>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box
          h="100%"
          zIndex="1"
          w={{ md: "60%", sm: xwidth, lg: "70%" }}
          backgroundColor="green"
        >
          <Box w="100%" h={{ md: "10vh", sm: "15vh" }}>
            <MessageNav updateWidth={updateWidth} {...Mnav} />
          </Box>
          <Box h={{ md: "90vh", sm: "85vh" }} w="100%">
            <Messanger uid={uid}/>
          </Box>
        </Box>
      </Box>
    );
  }
  return <Navigate to="/auth/login" />;
}
