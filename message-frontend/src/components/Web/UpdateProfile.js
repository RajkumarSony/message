import React, { useCallback, useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  Image,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

import { useDropzone } from "react-dropzone";
import { auth, storage } from "../../FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function UpdateProfile(props) {
  const [files, setFiles] = useState([]);
  const [drop, setDrop] = useState(true);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setDrop(false);
    console.log(acceptedFiles);
    console.log(files);
      },[files]);

  const { getRootProps, getInputProps, open, isDragReject, isDragActive } =
    useDropzone({
      onDrop,
      accept: "image/*",
      maxFiles: 1,
    });
  const thumb = files.map((file) => (
    <Box key={file.name}>
      <Image src={file.preview} />
    </Box>
  ));
  const uploadProfile = (event) => {
    event.preventDefault();
    setLoading(true);
    const storageRef = ref(
      storage,
      `ProfileImage/${auth.currentUser.uid}/profile.${
        files[0].type.split("/")[1]
      }`
    );
    uploadBytes(storageRef, files[0])
      .then((snapshot) => {
        console.log(snapshot);
        getDownloadURL(storageRef).then((url) => {
          axios
            .post(
              "/uploadprofile",
              { url: url, uid: auth.currentUser.uid },
              {
                headers: {
                  authorization: auth.currentUser.accessToken,
                },
              }
            )
            .then((res) => {
              setLoading(false);
              props.profile();
            });
        });
      })
      .catch((error) => {
        console.log("file Upload Error", error);
      });
  };
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      console.log("cleanup");
    };
  }, [files]);

  return (
    <Flex h="90vh" overflowY="auto" mt="5vh" justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Profile Picture</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={uploadProfile}>
              <FormControl
                // backgroundImage={img}
                h="140px"
                w="250px"
                d={drop ? "flex" : "none"}
                cursor="pointer"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                fontWeight={800}
                backgroundColor="darkslategrey"
                color="whiteAlpha.500"
                border={
                  isDragActive
                    ? isDragReject
                      ? "3px dashed red"
                      : "3px dashed green"
                    : "3px dashed grey"
                }
                {...getRootProps()}
                id="profile"
              >
                <Input {...getInputProps()} type="file" />
                {isDragActive ? (
                  isDragReject ? (
                    <Text color="red.500" textAlign="center">
                      Only Images (PNG,JPEG,SVG,jfif )are supported
                    </Text>
                  ) : (
                    <Text color="green.700" textAlign="center">
                      Drop Image here...
                    </Text>
                  )
                ) : (
                  <Text textAlign="center">
                    Drag 'n' drop some Image here, or click to select Image
                  </Text>
                )}
                
              </FormControl>

              <Box
                h="auto"
                w="auto"
                d="flex"
                justifyContent="center"
                alignItems="center"
              >
                {thumb}
              </Box>
              <Stack pt={6} spacing={10}>
                <Box d="flex" justifyContent="space-around">
                  <Button
                    w="40%"
                    border="1px solid blue"
                    bg={"lightgrey"}
                    color={"black"}
                    onClick={
                      !drop
                        ? () => {
                            setFiles([]);
                            setDrop(true);
                          }
                        : open
                    }
                    _hover={{
                      bg: "blue.400",
                      color: "white",
                    }}
                  >
                    {!drop ? "Remove" : "Choose file"}
                  </Button>
                  <Button
                    isLoading={loading}
                    w="40%"
                    d={!drop ? "block" : "none"}
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "white",
                      color: "black",
                      border: "1px solid blue",
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
