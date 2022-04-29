import React from "react";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { Box, Avatar, Icon, Link } from "@chakra-ui/react";
import { Link as reachLink } from "react-router-dom";
import { useThemeConfig } from "../../ThemeConfig";
export default function ContactNav(props) {
  const { config } = useThemeConfig();

  return (
    <Box
      d="flex"
      w="100%"
      alignItems="center"
      borderRight={{ md: config.borderRn }}
      justifyContent="space-between"
      boxSizing="content-box"
      pb={{ md: "5px" }}
      backgroundColor={config.navBg}
      h="100%"
      borderBottom={{ md: config.border }}
    >
      <Box ml={2} d="flex" alignItems="center" h="100%">
        <Avatar
          onClick={props.profile}
          cursor="pointer"
          maxH="100%"
          src={props.src}
          name={props.name}
        />
      </Box>
      <Box d="flex" alignItems="center" justifyContent="space-around" mr={3}>
        <Link
          d="flex"
          alignItems="center"
          justifyContent="center"
          fontSize={28}
          as={reachLink}
          mr={3}
          to="/"
          title="Home"
        >
          <Icon color={config.IconColor} as={AiOutlineHome} cursor="pointer" />
        </Link>
        <Icon
          title="Contacts"
          color={config.IconColor}
          fontSize={28}
          mr={3}
          onClick={props.contactList}
          as={BiMessageRoundedAdd}
          cursor="pointer"
        />
      </Box>
    </Box>
  );
}
