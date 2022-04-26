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
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate, Link as reachLink } from "react-router-dom";
import { retrieveIdentity } from "../SealedInit";
import Cookies from "js-cookie";
import axios from "axios";
import { useThemeConfig } from "../ThemeConfig";
export default function SimpleCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null); // Manage Email State input from user
  const [password, setPassword] = useState(null); // Manage password State input from user
  const [loading, Setloading] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [passRetrival, setPassRetrival] = useState();
  const [authenticate, setAuthenticate] = useState(false);
  const [atwoManRuleKey, setTwoManRuleKey] = useState();
  const [atwoManRuleSessionId, setTwoManRuleSessionId] = useState();
  const [otpLoading, setOtpLoading] = useState(false);
  const { config } = useThemeConfig();
  const [error, Seterror] = useState({
    code: null,
    error: false,
    message: null,
  }); // Manage Error State
  // Login Handler
  const login = (event) => {
    Setloading(true);
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
          axios
            .post(
              "/session/login",
              {
                uid: auth.currentUser.uid,
              },
              {
                headers: {
                  Authorization: auth.currentUser.accessToken,
                  "Content-Type": "application/json",
                },
              }
            )
            .then(async (res) => {
              // Retrive password protected Idetity from SSKS server and store in local database encrupted with databaseKey
              // await  retrieveIdentity({userId:auth.currentUser.uid,databaseKey:Cookies.get("databaseKey"),sessionID:Cookies.get("sessionId"),emailAddress:auth.currentUser.email,twoManRuleKey:,twoManRuleSessionId:""})
              const {
                twoManRuleSessionId,
                twoManRuleKey,
                mustAuthenticate,
                passRetrival,
              } = res.data;
              Setloading(false);

              if (mustAuthenticate) {
                setAuthenticate(true);
                setTwoManRuleSessionId(twoManRuleSessionId);
                setTwoManRuleKey(twoManRuleKey);
                setPassRetrival(passRetrival);
                Seterror({
                  code: "otp_sent",
                  error: false,
                  message: "OTP sent check your mail",
                });
              } else {
                await retrieveIdentity({
                  userId: auth.currentUser.uid,
                  databaseKey: Cookies.get("databaseKey"),
                  sessionID: Cookies.get("sessionId"),
                  emailAddress: auth.currentUser.email,
                  twoManRuleKey: twoManRuleKey,
                  twoManRuleSessionId: twoManRuleSessionId,
                  password: passRetrival ? password : false,
                });
                navigate("/"); // Navigate to homePage
                localStorage.setItem("login", true);
              }
            });
        })
        .catch((error) => {
          Setloading(false);
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
      Setloading(false);
    }
  };
  const submitChallenge = async () => {
    setOtpLoading(true);
    console.log(auth.currentUser.email);
    // try {
    await retrieveIdentity({
      challenge: challenge,
      userId: auth.currentUser.uid,
      twoManRuleKey: atwoManRuleKey,
      emailAddress: auth.currentUser.email,
      twoManRuleSessionId: atwoManRuleSessionId,
      databaseKey: Cookies.get("databaseKey"),
      sessionID: Cookies.get("sessionId"),
      password: passRetrival ? password : false,
    });
    setOtpLoading(false);
    navigate("/");
    localStorage.setItem("login", true);
    // }
    // catch {
    //   signOut(auth).then(() => {
    //     // Request to clear databaekey and session id and destroy the session after logout
    //     axios
    //       .post(
    //         "/session/logout",
    //         { reqest: "logout" },
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         localStorage.removeItem("user");
    //         localStorage.setItem("login", false);
    //         setAuthenticate(false);
    //         Setloading(false);
    //         setOtpLoading(false);
    //         Seterror({
    //           code: "Invalid OTP",
    //           error: true,
    //           message: "Invalid OTP login again",
    //         });
    //       });
    //   });
    // }
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
  return (
    <Flex mt={91} minH={"100vh"} align={"center"} justify={"center"}>
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
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <Text
              h={10}
              d={"flex"}
              opacity={error.code ? 1 : 0}
              p="2"
              alignItems="center"
              justifyContent={"center"}
              borderRadius={10}
              backgroundColor={
                error.error ? "rgba(232, 39, 39, 0.5)" : "#4BB543"
              }
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
                  borderColor={config.inBorder}
                  disabled={authenticate}
                  onChange={handleEmail}
                  autoComplete="username"
                  type="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  borderColor={config.inBorder}
                  onChange={handlePassword}
                  autoComplete="current-password"
                  type="password"
                  disabled={authenticate}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {/* <p>New user?</p> <Link m={0} to="/auth/signup" as={reachLink}>Sign Up</Link> */}
                  <Link as={reachLink} to="/auth/resetpswd" color={"blue.400"}>
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  disabled={authenticate}
                  loadingText="Checking Info..."
                  isLoading={loading}
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
            {authenticate && (
              <>
                <Input
                  borderColor={config.inBorder}
                  onChange={(e) => {
                    setChallenge(e.target.value);
                    Seterror({
                      code: null,
                      error: false,
                      message: null,
                    });
                  }}
                  placeholder="enter challenge send in your email"
                />
                <Button
                  isLoading={otpLoading}
                  loadingText="Validating"
                  onClick={submitChallenge}
                >
                  Submit
                </Button>
              </>
            )}
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
}
