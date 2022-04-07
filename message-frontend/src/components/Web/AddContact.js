import React,{useState} from "react";
import axios from "axios";
import { auth } from "../../FirebaseConfig";
import {AiOutlineCloseSquare} from "react-icons/ai"
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
    Icon
  } from "@chakra-ui/react";
import { useThemeConfig } from "../../ThemeConfig";

export default function AddContact(props) {
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
 const config  = useThemeConfig();
  const handleEmail = (event) => {
    setEmail(event.target.value);
    props.setError({
      error: false,
      code: null,
      message: null,
    });
  };
  const addContact = (event) => {
    event.preventDefault();
    props.setError({
      error: false,
      code: null,
      message: null,
    });
    setLoading(true);
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
        props.updatePopup();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          props.setError({
            error: true,
            code: error.response.code,
            message: error.response.data,
          });
        }
      });
  };
  return (
    <Flex bg={config.contactBg} direction="column" alignItems="flex-end" mt="5px" h="100%" overflowY="bolck"  >
         <Icon
          color={config.IconColor}
          cursor="pointer"
          mr={3}
          onClick={() => {
          
            props.updatePopup();
          }}
          fontSize={28}
          as={AiOutlineCloseSquare}
        />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Add Contact</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to start messaging your friends ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <Text
              h={10}
              d={"flex"}
              opacity={props.error.error ? 1 : 0}
              p="2"
              alignItems="center"
              justifyContent={"center"}
              borderRadius={10}
              backgroundColor="rgba(232, 39, 39, 0.5)"
              align={"center"}
              color="white"
              transition="opacity 0.5s ease"
            >
              {props.error.message}
              {"    "}
            </Text>
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
                    isLoading={loading}
                    // spinner={<BeatLoader size={8} color='white' />}
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
  );
}
