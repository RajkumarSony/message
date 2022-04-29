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
import { useLocation, Link as reachLink, useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig";
import { confirmPasswordReset } from "firebase/auth";
import { useThemeConfig } from "../ThemeConfig";

export default function Reset() {
  const { config } = useThemeConfig();
  const navigate = useNavigate();
  const search = useLocation().search;
  const oobCode = new URLSearchParams(search).get("oobCode");
  const [password, setPassword] = useState();
  const [cpassowrd, setCpassowrd] = useState();
  const [loading, setLoading] = useState(false);
  const [ticker, setTicker] = useState({
    code: null,
    error: false,
    message: null,
  });
  const setNewPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    if (password === cpassowrd) {
      confirmPasswordReset(auth, oobCode, password)
        .then(() => {
          setLoading(false);
          navigate("/auth/login");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.code);
          console.log(err.message);
        });
    } else {
      setLoading(false);
      setTicker({
        code: "different-password",
        error: true,
        message: "confirm password does not match.",
      });
    }
  };

  return (
    <Flex mt={91} minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Set New Password</Heading>
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
            <form onSubmit={setNewPassword}>
              <FormControl id="password">
                <FormLabel>New Password</FormLabel>
                <Input
                  borderColor={config.inBorder}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setTicker({
                      code: null,
                      error: false,
                      message: null,
                    });
                  }}
                  autoComplete="password"
                  type="password"
                />
              </FormControl>
              <FormControl mt={3} id="confirm-password">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  borderColor={config.inBorder}
                  onChange={(e) => {
                    setCpassowrd(e.target.value);
                    setTicker({
                      code: null,
                      error: false,
                      message: null,
                    });
                  }}
                  autoComplete="password"
                  type="password"
                />
              </FormControl>
              <Stack mt={10}>
                <Button
                  isLoading={loading}
                  loadingText="setting Password..."
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Set Password
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
  );
}
