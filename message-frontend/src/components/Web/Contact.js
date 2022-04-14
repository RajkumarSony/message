import React from "react";
import { Box, Avatar, Text } from "@chakra-ui/react";
import { useThemeConfig } from "../../ThemeConfig";
export default function Contact(props) {
  const { config } = useThemeConfig();
  return (
    <Box
      h="80px"
      onClick={props.onClick}
      cursor="pointer"
      d="flex"
      backgroundColor={config.contactBg}
    >
      <Avatar
        my={3}
        mx={2}
        name={props.name}
        cursor="pointer"
        size="lg"
        src={props.photoURL}
      />
      <Box
        mt={props.message ? 4 : "12px"}
        flexDirection="column"
        d="flex"
        width="90%"
        h="80%"
        justifyContent={props.message ? "normal" : "center"}
        style={{
          borderBottom: config.ContactBorder,
        }}
      >
        <Box>
          <Text
            fontWeight="bold"
            fontSize={props.message ? "20px" : "24px"}
            lineHeight="30px"
            width="85%"
          >
            {props.name || props.Number}
          </Text>
        </Box>
        <Box
          d={props.message ? "block" : "none"}
          h={23}
          style={{ overflow: "hidden" }}
        >
          <Text style={{ color: "grey", width: "85%" }}>
            {props.message || ""}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
