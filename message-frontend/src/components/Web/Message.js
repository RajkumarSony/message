import React, { useState,useEffect } from "react";
import { Text,SkeletonText } from "@chakra-ui/react";
export default function Message(props) {
  const [message, setMessage] = useState(null);
  const session = props.session;
  useEffect(() => {
    session.decryptMessage(props.message).then((decryptMessage) => {
      setMessage(decryptMessage);
    });
  }, []);

  return (
    <Text>
      {message ? (
        message
      ) : (
        <SkeletonText
          startColor="#a59a9a"
          endColor="#83d8d8"
          noOfLines={2}
          mr={2}
          spacing="4"
        />
      )}
    </Text>
  );
}
