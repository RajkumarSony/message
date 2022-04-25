import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  Icon,
} from "@chakra-ui/react";
import { Navigate, useNavigate, Link as reachLink } from "react-router-dom";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import axios from "axios";
import { createIdentity, saveIdentity } from "../SealedInit";
import Cookies from "js-cookie";
import { useThemeConfig } from "../ThemeConfig";
export default function SignupCard() {
  const { config } = useThemeConfig();
  const [showPassword, setShowPassword] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [loading, Setloading] = useState(false);
  const [error, Seterror] = useState({
    code: null,
    error: false,
    message: null,
  });
  const [authenticate, setAuthenticate] = useState(false);
  const [atwoManRuleKey, setTwoManRuleKey] = useState();
  const [atwoManRuleSessionId, setTwoManRuleSessionId] = useState();
  const navigate = useNavigate();
  const register = () => {
    axios
      .post(
        "/register",
        {
          uid: auth.currentUser.uid,
          name: auth.currentUser.displayName,
        },
        {
          headers: {
            Authorization: auth.currentUser.accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        const { token, twoManRuleSessionId, twoManRuleKey, mustAuthenticate } =
          res.data;

        const databaseKey = Cookies.get("databaseKey");
        const sessionID = Cookies.get("sessionId");
        await createIdentity({
          userId: auth.currentUser.uid,
          userLicenseToken: token,
          databaseKey: databaseKey,
          sessionID: sessionID,
          jwt: auth.currentUser.accessToken,
        });
        if (mustAuthenticate) {
          setAuthenticate(true);
          setTwoManRuleSessionId(twoManRuleSessionId);
          setTwoManRuleKey(twoManRuleKey);
        } else {
          await saveIdentity({
            userId: auth.currentUser.uid,
            twoManRuleKey: twoManRuleKey,
            emailAddress: auth.currentUser.email,
            twoManRuleSessionId: twoManRuleSessionId,
            databaseKey: databaseKey,
            sessionID: sessionID,
          });
          navigate("/");
          localStorage.setItem("login", true);
        }
      });
  };
  const submitChallenge = async () => {
    await saveIdentity({
      challenge: challenge,
      userId: auth.currentUser.uid,
      twoManRuleKey: atwoManRuleKey,
      emailAddress: auth.currentUser.email,
      twoManRuleSessionId: atwoManRuleSessionId,
      databaseKey: Cookies.get("databaseKey"),
      sessionID: Cookies.get("sessionId"),
    });
    localStorage.setItem("login", true);

    navigate("/");
  };
  const signup = (event) => {
    Setloading(true);
    event.preventDefault();
    console.log(email);
    if (
      email !== "" &&
      email !== null &&
      password !== "" &&
      password !== null &&
      fname !== null &&
      fname !== ""
    ) {
      console.log(fname);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (lname === null || lname === "") {
            updateProfile(auth.currentUser, {
              displayName: `${fname}`,
            }).then(() => {
              register();
            });
          } else {
            updateProfile(auth.currentUser, {
              displayName: `${fname} ${lname}`,
            }).then(() => {
              register();
            });
          }
        })
        .catch((error) => {
          Setloading(false);
          if (error.code === "auth/email-already-in-use") {
            Seterror({
              code: error.code,
              error: true,
              message: `${email} is already in use`,
            });
          } else if (error.code === "auth/invalid-email") {
            Seterror({
              code: error.code,
              error: true,
              message: "use valid email",
            });
          } else {
            Seterror({
              code: "some thing went wrong",
              error: true,
              message: "Something went worng ",
            });
          }
          console.log(error.code);
        });
    } else {
      Seterror({
        code: "email empty",
        error: true,
        message: "fill required filds marked with *",
      });
      Setloading(false);
      console.log(email);
    }
  };
  const handleFname = (event) => {
    setFname(event.target.value);
    Seterror({
      code: null,
      error: false,
      message: null,
    });
  };
  const handleLname = (event) => {
    setLname(event.target.value);
    Seterror({
      code: null,
      error: false,
      message: null,
    });
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
        // bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            // bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Text
                h={10}
                d={"flex"}
                opacity={error.error ? 1 : 0}
                p="2"
                alignItems="center"
                justifyContent={"center"}
                borderRadius={10}
                backgroundColor="rgba(232, 39, 39, 0.5)"
                align={"center"}
                color="white"
                transition="opacity 0.5s ease"
              >
                {error.message}
                {"    "}
              </Text>
              <form onSubmit={signup}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        borderColor={config.inBorder}
                        onChange={handleFname}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        borderColor={config.inBorder}
                        onChange={handleLname}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    borderColor={config.inBorder}
                    autoComplete="username"
                    onChange={handleEmail}
                    type="email"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      borderColor={config.inBorder}
                      onChange={handlePassword}
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        <Icon
                          as={showPassword ? AiFillEye : AiFillEyeInvisible}
                        />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Creating Account..."
                    isLoading={loading}
                    type="submit"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </form>

              {authenticate && (
                <>
                  <Input
                    borderColor={config.inBorder}
                    onChange={(e) => {
                      setChallenge(e.target.value);
                    }}
                    placeholder="enter challenge send in your email"
                  />
                  <Button onClick={submitChallenge}>Submit</Button>
                </>
              )}
              <Stack pt={3}>
                <Text pt={3} align={"center"}>
                  Already a user?{" "}
                  <Link as={reachLink} to="/auth/login" color={"blue.400"}>
                    Login
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
