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
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { Navigate, useNavigate, Link as reachLink } from "react-router-dom";
export default function SimpleCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, Seterror] = useState({
    code: null,
    error: false,
    message: null,
  });
  const login = () => {
    if (
      email !== "" &&
      email !== null &&
      password !== "" &&
      password !== null
    ) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem("user", auth.currentUser);
          navigate("/");
        })
        .catch((error) => {
          if (
            error.code === "auth/user-not-found" ||
            error.code === "auth/wrong-password"
          ) {
            Seterror({
              code: error.code,
              error: true,
              message: `Incorrect Email or Password`,
            });
          }else if(error.code==="auth/invalid-email"){
            Seterror({
              code:error.code,
              error:true,
              message:"Invalid Email address"
            })
          }
           else {
            Seterror({
              code:error.code,
              error:true,
              message:"Something went wrong try again"
            })
            console.log(error.code)
          }
       
        });
    } else {
      Seterror({
        code: "email empty",
        error: true,
        message: "Email & Password is required for login",
      });
    }
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
    Seterror({
      code: null,
      error: false,
      message: null,
    });
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    Seterror({
      code: null,
      error: false,
      message: null,
    });
  };
  if (!auth.currentUser) {
    return (
      <Flex
        mt={91}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        // bg={("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>LogIn to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool{" "}
              <Link as={reachLink} to="/features" color={"blue.400"}>
                features
              </Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            // bg={("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
            <Text
                  h={10}
                  d={"flex" }
                  opacity={error.code?1:0}
                  p="2"
                  alignItems="center"
                  justifyContent={"center"}
                  borderRadius={10}
                  backgroundColor="rgba(232, 39, 39, 0.5)"
                  align={"center"}
                  color="white" 
                >
                  { error.message}
                  {"    "}
                </Text>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={handleEmail} type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={handlePassword} type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {/* <p>New user?</p> <Link m={0} to="/auth/signup" as={reachLink}>Sign Up</Link> */}
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  onClick={login}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Log In
                </Button>
              </Stack>
              <Stack pt={6}>
             
                <Text h={10} p="2" align={"center"}>
                  New user?{"    "}
                  <Link as={reachLink} to="/auth/signup" color={"blue.400"}>
                    SignUp
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  } else {
    return <Navigate to="/web" />;
  }
}
