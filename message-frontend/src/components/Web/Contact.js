import React from "react";
import {
  Box,
  Avatar,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Image,
} from "@chakra-ui/react";
import { useThemeConfig } from "../../ThemeConfig";
export default function Contact(props) {
  const { config } = useThemeConfig();
  return (
    <Box h="80px" cursor="pointer" d="flex" backgroundColor={config.contactBg}>
      <Popover>
        <PopoverTrigger>
          <Avatar
            my={3}
            mx={2}
            name={props.name}
            cursor="pointer"
            size="lg"
            src={props.photoURL}
          />
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody d="flex" justifyContent="center" alignItems="center">
            {props.photoURL ? (
              <Image src={props.photoURL} />
            ) : (
              <Avatar
                my={3}
                mx={2}
                cursor="pointer"
                size="2xl"
                src={props.photoURL}
              />
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Box
        onClick={props.onClick}
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
