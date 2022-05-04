import { Box, Image } from "@chakra-ui/react";
import React from "react";

export default function Images(props) {
  const [url, setUrl] = useState();

  return (
    <>
      <Box maxW="100%" w="fit-content" p={2} h="fit-content">
        <Image maxW="98%" src={url} alt="Image" />
      </Box>
    </>
  );
}
