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
import { retrieveIdentity } from "../SealedInit";
import Cookies from "js-cookie";
import axios from "axios";
export default function SimpleCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null); // Manage Email State input from user
  const [password, setPassword] = useState(null); // Manage password State input from user
  const [error, Seterror] = useState({
    code: null,
    error: false,
    message: null,
  }); // Manage Error State
// Login Handler 
  const login = (event) => {
    event.preventDefault();
    if (
      email !== "" &&
      email !== null &&
      password !== "" &&
      password !== null
    ) {
      signInWithEmailAndPassword(auth, email, password) // Login user with email and password firebase auth
        .then(async (userCredential) => {
          localStorage.setItem("user", auth.currentUser); // Set user in Local Storage
          // Request sesseion id and databaeKey
          axios.post("/session/login",  {
            uid:auth.currentUser.uid,
          },
          {
            headers: {
              Authorization: auth.currentUser.accessToken,
              'Content-Type': 'application/json'
            },
          }).then(async (res)=>{
            // Retrive password protected Idetity from SSKS server and store in local database encrupted with databaseKey
          await  retrieveIdentity({userId:auth.currentUser.uid,password:password,databaseKey:Cookies.get("databaseKey"),sessionID:Cookies.get("sessionId")})
            navigate("/"); // Navigate to homePage
          })
        })
        .catch((error) => {
          // Error Handling user not found
          if (error.code === "auth/user-not-found") {
            Seterror({
              code: error.code,
              error: true,
              message: "Email not registered plese SignUp first",
            });
             // Error Handling Invalid Email Id
          } else if (error.code === "auth/invalid-email") {
            Seterror({
              code: error.code,
              error: true,
              message: "Invalid Email address",
            });
              // Error Handling Wrong Password
          } else if (error.code === "auth/wrong-password") {
            Seterror({
              code: error.code,
              error: true,
              message: "Forget your password? Reset it",
            });
          } else {
              // Error Handling Unknown Error
            Seterror({
              code: error.code,
              error: true,
              message: "Something went wrong try again",
            });
            console.log(error.code);
          }
        });
    } else {
      // Error Handling no email provided
      Seterror({
        code: "email empty",
        error: true,
        message: "Email & Password is required for login",
      });
    }
  };

  // Email handler update email state on change of email field in form 
  const handleEmail = (event) => {
    setEmail(event.target.value);
    Seterror({
      code: null,
      error: false,
      message: null,
    });
  };
    // password handler update password state on change of passwordl field in form 
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
       
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>LogIn to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool{" "}
              {/* reacLink is Defined as react Link from react-router-dom */}
              <Link as={reachLink} to="/features" color={"blue.400"}>
                features
              </Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
           
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Text
                h={10}
                d={"flex"}
                opacity={error.code ? 1 : 0}
                p="2"
                alignItems="center"
                justifyContent={"center"}
                borderRadius={10}
                backgroundColor="rgba(232, 39, 39, 0.5)"
                align={"center"}
                color="white"
                transition="opacity 0.5s ease-in-out"
              >
                {error.message}
                {"    "}
              </Text>
              <form onSubmit={login}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    onChange={handleEmail}
                    autoComplete="username"
                    type="email"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    onChange={handlePassword}
                    autoComplete="current-password"
                    type="password"
                  />
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
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Log In
                  </Button>
                </Stack>
              </form>
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
