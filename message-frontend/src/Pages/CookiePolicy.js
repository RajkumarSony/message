import React from "react";
import { Box, Text, ListItem, UnorderedList } from "@chakra-ui/react";

export default function CookiePolicy() {
  return (
    <Box m="auto" w="93%" mb={3}>
      <Text p={2} textAlign="center" fontSize="32" fontWeight="600">
        Cookie Policy for message hub
      </Text>

      <Text p={2}>
        This is the Cookie Policy for message hub, accessible from
        https://secure-message-hub.herokuapp.com/
      </Text>

      <Text p={2}>
        <strong>What Are Cookies</strong>
      </Text>

      <Text p={2}>
        As is common practice with almost all professional websites this site
        uses cookies, which are tiny files that are downloaded to your computer,
        to improve your experience. This page describes what information they
        gather, how we use it and why we sometimes need to store these cookies.
        We will also share how you can prevent these cookies from being stored
        however this may downgrade or 'break' certain elements of the sites
        functionality.
      </Text>

      <Text p={2}>
        <strong>How We Use Cookies</strong>
      </Text>

      <Text p={2}>
        We use cookies for a variety of reasons detailed below. Unfortunately in
        most cases there are no industry standard options for disabling cookies
        without completely disabling the functionality and features they add to
        this site. It is recommended that you leave on all cookies if you are
        not sure whether you need them or not in case they are used to provide a
        service that you use.
      </Text>

      <Text p={2}>
        <strong>Disabling Cookies</strong>
      </Text>

      <Text p={2}>
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser Help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of the this site. Therefore
        it is recommended that you do not disable cookies.
      </Text>
      <Text p={2}>
        <strong>The Cookies We Set</strong>
      </Text>

      <UnorderedList>
        <ListItem>
          <Text p={2}>Account related cookies</Text>
          <Text p={2}>
            If you create an account with us then we will use cookies for the
            management of the signup process and general administration. These
            cookies will usually be deleted when you log out however in some
            cases they may remain afterwards to remember your site preferences
            when logged out.
          </Text>
        </ListItem>

        <ListItem>
          <Text p={2}>Login related cookies</Text>
          <Text p={2}>
            We use cookies when you are logged in so that we can remember this
            fact. This prevents you from having to log in every single time you
            visit a new page. These cookies are typically removed or cleared
            when you log out to ensure that you can only access restricted
            features and areas when logged in.
          </Text>
        </ListItem>

        <ListItem>
          <Text p={2}>Site preferences cookies</Text>
          <Text p={2}>
            In order to provide you with a great experience on this site we
            provide the functionality to set your preferences for how this site
            runs when you use it. In order to remember your preferences we need
            to set cookies so that this information can be called whenever you
            interact with a page is affected by your preferences.
          </Text>
        </ListItem>
      </UnorderedList>

      <Text p={2}>
        <strong>Third Party Cookies</strong>
      </Text>

      <Text p={2}>
        In some special cases we also use cookies provided by trusted third
        parties. The following section details which third party cookies you
        might encounter through this site.
      </Text>

      <UnorderedList>
        <ListItem>
          <Text p={2}>
            This site uses Google Analytics which is one of the most widespread
            and trusted analytics solution on the web for helping us to
            understand how you use the site and ways that we can improve your
            experience. These cookies may track things such as how long you
            spend on the site and the pages that you visit so we can continue to
            produce engaging content.
          </Text>
          <Text p={2}>
            For more information on Google Analytics cookies, see the official
            Google Analytics page.
          </Text>
        </ListItem>
      </UnorderedList>

      <Text p={2}>
        <strong>More Information</strong>
      </Text>

      <Text p={2}>
        Hopefully that has clarified things for you and as was previously
        mentioned if there is something that you aren't sure whether you need or
        not it's usually safer to leave cookies enabled in case it does interact
        with one of the features you use on our site.
      </Text>

      <Text p={2}>
        For more general information on cookies, please read{" "}
        <a href="https://www.generateprivacypolicy.com/#cookies">
          "Cookies" article from the Privacy Policy Generator
        </a>
        .
      </Text>

      <Text p={2}>
        However if you are still looking for more information then you can
        contact us through one of our preferred contact methods:
      </Text>

      <UnorderedList>
        <ListItem>Email: backend.nktechnical@gmail.com</ListItem>
      </UnorderedList>
    </Box>
  );
}
