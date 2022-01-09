import React from "react";
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
export default function UpdateProfile() {
    const uploadProfile = (event) => {
        event.preventDefault();
        console.log("clicked Upload");
      };
  return (
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
                 

                  type="file"
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
  );
}
