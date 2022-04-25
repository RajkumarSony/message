import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { auth } from "../FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link as reachLink } from "react-router-dom";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [ticker, setTicker] = useState({
    code: null,
    error: false,
    message: null,
  }); // Manage Error State
  // Login Handler
  const handleEmail = (event) => {
    setEmail(event.target.value);
    setTicker({
      code: null,
      error: false,
      message: null,
    });
  };
  const sendResetMail = (e) => {
    setLoading(true);
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        setTicker({
          code: "sucess",
          error: false,
          message: "Reset Link Sent to your email",
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === "auth/user-not-found") {
          setTicker({
            code: err.code,
            error: true,
            message: "Email not registered plese SignUp first ",
          });
        } else {
          console.log(err.message);
          console.log(err.code);
          setTicker({
            code: err.code,
            error: true,
            message: "unknown error try again .",
          });
        }
      });
  };
  return (
    <>
      <Flex mt={91} minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Reset Password</Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <Text
                h={10}
                d={"flex"}
                opacity={ticker.code ? 1 : 0}
                p="2"
                alignItems="center"
                justifyContent={"center"}
                borderRadius={10}
                backgroundColor={
                  ticker.error ? "rgba(232, 39, 39, 0.5)" : "#4BB543"
                }
                align={"center"}
                color="white"
                transition="opacity 0.5s ease-in-out"
              >
                {ticker.message}
                {"    "}
              </Text>
              <form onSubmit={sendResetMail}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    onChange={handleEmail}
                    autoComplete="username"
                    type="email"
                  />
                </FormControl>
                <Stack mt={10}>
                  <Button
                    isLoading={loading}
                    loadingText="Checking Info..."
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Reset Password
                  </Button>
                </Stack>
              </form>

              <Stack pt={6}>
                <Text h={10} p="2" align={"center"}>
                  Remember Password?{"    "}
                  <Link as={reachLink} to="/auth/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
