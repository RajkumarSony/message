import React from "react";
import { Box, Text, ListItem, UnorderedList, Link } from "@chakra-ui/react";
import { Link as reachLink } from "react-router-dom";

export default function CookiePolicy() {
  return (
    <Box m="auto" w="93%" mb={3}>
      <Text p={2} textAlign="center" fontSize="32" fontWeight="600">
        Cookie Policy for message hub
      </Text>

      <Text p={2}>
        This is the Cookie Policy for message hub, accessible from
        <Link color="blue.600" as={reachLink} to="/">
          {" "}
          https://secure-message-hub.herokuapp.com/
        </Link>
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
            <Text d="inline" color="blue.600">
              {" "}
              <a href="https://analytics.google.com/">
                {" "}
                Google Analytics{" "}
              </a>{" "}
            </Text>
            page.
          </Text>
        </ListItem>
        <ListItem>
          <Text p={2}>
            This site uses Google Firebase which is one of the trusted
            authentication service.Cookies are set by the firebase to identify
            the particular user's these are only used when you login to the
            application.These Might track your login information across you
            devices.
          </Text>
          <Text p={2}>
            For more information on Google Firebase cookies, see the official
            <Text d="inline" color="blue.600">
              {" "}
              <a href="https://firebase.google.com/"> Google Firebase </a>{" "}
            </Text>
            page.
          </Text>
        </ListItem>
      </UnorderedList>

      <Text p={2}>
        <strong>Local Storage</strong>
      </Text>

      <Text p={2}>
        Apart from Cookies we also use Local Storage and local database.{" "}
      </Text>
      <UnorderedList>
        <ListItem>
          <Text fontWeight={600}>Encrypted Identity</Text>
          <Text>
            We use end-to-end encryption to send messages. In order to do that
            we create a identy with the help of
            <Text color="blue.600" d="inline">
              <a href="https://www.seald.io/" target="_blank">
                {" "}
                seald-io{" "}
              </a>
            </Text>
            which is encrypted and stored on the server and can only be
            decrypted by you by providing your password and otp while login. So
            in order to keep you logged in a copy of the decrypted identy is
            stored in the local database named neDB. This identity remains on
            your computer browser and is encrypted by a database key which is
            known to backend so only the application can access the identity on
            your behalf when you revisit the application. This database is
            cleared once you logout or session expires so it cannot be retrived
            when you are logged out helpful when using public computer.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight={600}>Manage Session & Preference</Text>
          <Text>
            Various Local Variables are set to manage session and record
            preferences of your choice like using light or dark mode etc.These
            are only known to the browser of your computer and can be read by
            the application and these are not send to the server for any
            purpose.
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
        However if you are still looking for more information then you can
        contact us through one of our preferred contact methods:
      </Text>

      <UnorderedList>
        <ListItem>
          Email:{" "}
          <Text d="inline" color="blue.600">
            <a href="mailto:backend.nktechnical@gmail.com">
              backend.nktechnical@gmail.com
            </a>
          </Text>
        </ListItem>
      </UnorderedList>
    </Box>
  );
}
