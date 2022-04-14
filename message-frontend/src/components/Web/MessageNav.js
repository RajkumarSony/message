import { Box, Avatar, Icon, Text, Button } from "@chakra-ui/react";
import "../../style.css";
import React from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useThemeConfig } from "../../ThemeConfig";

export default function MessageNav(props) {
  // const history=useNavigate()
  const handleBack = () => {
    props.updateWidth();
  };
  const { config, toggleColor } = useThemeConfig();

  return (
    // <Box d="flex" h="100%" w="100%" backgroundColor="green">
    <Box
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={config.navBg}
      h="100%"
      zIndex="1000"
      boxSizing="content-box"
      pb={{ md: "5px" }}
      borderLeft={{
        md: config.borderRn,
      }}
    >
      <Box ml={2} d="flex" alignItems="center" h="100%">
        <Icon
          color={config.IconColor}
          mr={2}
          onClick={handleBack}
          fontSize={28}
          as={IoMdArrowRoundBack}
        />
        <Avatar name={props.name} maxH="100%" src={props.src} mr={2} />
        <Text color="white" fontSize={{ md: "xl", sm: "lg" }}>
          {props.name}
        </Text>
      </Box>
      <Box d="flex" flexDirection="row" alignItems="center">
        <Button colorScheme="transparent" variant="ghost" onClick={toggleColor}>
          <Icon
            style={{ padding: "0 4px", fontSize: "28", fontWeight: "bold" }}
            color={config.IconColor}
            as={config.Icon}
          />
        </Button>
        <Icon
          color={config.IconColor}
          mr={3}
          fontSize={28}
          as={AiTwotoneSetting}
        />
      </Box>
    </Box>
    // </Box>
  );
}
