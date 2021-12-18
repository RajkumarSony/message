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
} from "@chakra-ui/react";
import { Navigate, useNavigate, Link as reachLink } from "react-router-dom";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../FirebaseConfig";
export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [error, Seterror] = useState({
    code: null,
    error: false,
    message: null,
  });
  const navigate = useNavigate();
  const signup = () => {
    console.log(email);
    if ( email !== "" && email !== null && password !== "" && password !== null && fname !== null && fname !== ""
    ) {
      console.log(fname);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (lname === null || lname==="") {
            updateProfile(auth.currentUser, {
              displayName: `${fname}`,
            }).then(() => {
              console.log(userCredential);
            });
          }else{
            updateProfile(auth.currentUser, {
              displayName: `${fname} ${lname}`,
            }).then(() => {
              console.log(userCredential);
            });
          }
          console.log("userCreated");
          navigate("/");
        })
        .catch((error) => {
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
      console.log(email);
    }
  };
  const handleFname = (event) => {
    setFname(event.target.value);
  };
  const handleLname = (event) => {
    setLname(event.target.value);
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
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input onChange={handleFname} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input onChange={handleLname} type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input onChange={handleEmail} type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handlePassword}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  onClick={signup}
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
              <Stack pt={3}>
                <Text
                  borderRadius={10}
                  backgroundColor={
                    error.error ? "rgba(232, 39, 39, 0.5)" : "white"
                  }
                  pt={3}
                  align={"center"}
                >
                  {error.error ? error.message : "Already a user?"}{" "}
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
