import React, { useState, useEffect } from "react";
import Web from "./Web";
import { Box, Progress, Text, Link,Button, Icon, useColorMode } from "@chakra-ui/react";
import { Link as reachLink } from "react-router-dom";
import { auth } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useThemeConfig } from "../ThemeConfig";
export default function WebMid() {
  const config = useThemeConfig();
  const [authd, setAuthd] = useState(null);
  const [reDirect, setReDirect] = useState(false);
  const {toggleColorMode} = useColorMode();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthd(true);
      } else {
        setAuthd(false);
      }
    });
  }, []);
  useEffect(() => {
    if (authd === false) {
      setTimeout(() => {
        if (auth.user) {
          setReDirect(false);
        } else {
          setReDirect(true);
        }
      }, 4000);
    } else {
      console.log(authd);
    }
  }, [authd]);

  return (
    <>
    {reDirect && <Button onClick={toggleColorMode} variant="ghost" position="absolute" right={4} top={4}><Icon color={config.IconColor} as={config.Icon}/></Button> }
      {authd ? (
        <Web />
      ) : (
        <Box
          h="100vh"
          bg={config.mesBg}
          w="100vw"
          d="flex"
          justifyContent="center"
          alignItems="center"
        >



          {reDirect ? (
            <>
              <Text textAlign="center" w="80vw">
                You are Not Logged In{" "}
                <Button variant="link">
                  <Link as={reachLink} to="/auth/login">
                    Login
                  </Link>
                </Button>{" "}
                or{" "}
                <Button variant="link">
                  <Link as={reachLink} to="/auth/signup">
                    Signup
                  </Link>
                </Button>{" "}
                <br />
                <Button variant="link">
                  <Link as={reachLink} to="/">
                    Go back to Home Page
                  </Link>
                </Button>
              </Text>
            </>
          ) : (
            <Progress size="xs" borderRadius="10%" w="80vw" isIndeterminate />
          )}


        </Box>
      )}
    </>
  );
}
