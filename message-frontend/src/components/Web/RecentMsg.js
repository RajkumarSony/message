import React, { useState, useEffect } from "react";
import { db, auth } from "../../FirebaseConfig";
import { ref, onValue, limitToLast, query } from "firebase/database";
import Contact from "./Contact";

import { Box, Text} from "@chakra-ui/react";
import SkeletonContact from "./SkeletonContact";

export default function RecentMsg(props) {
  const [data, setData] = useState();
  const [hasData, setHasData] = useState(true);
  useEffect(() => {
    onValue(ref(db, `${auth.currentUser.uid}/chats`), (datax) => {
      const x = [];
      let itemsProcessed = 0;

      if (datax.hasChildren()) {
        datax.forEach((data) => {
          onValue(
            ref(db, data.key),
            (snapshot) => {
              let i = 0;

              onValue(
                query(
                  ref(db, `${auth.currentUser.uid}/chats/${data.key}`),
                  limitToLast(1)
                ),
                (mesg) => {
                  mesg.forEach((mesg) => {
                    x.push({
                      name: snapshot.val().Name,
                      email: snapshot.val().email,
                      photoURL: snapshot.val().photoURL,
                      uid: snapshot.val().uid,
                      message: mesg.val().message,
                    });
                    itemsProcessed++;
                    if (itemsProcessed === datax.size) {
                      setData(x);
                    }
                  });
                },
                {
                  onlyOnce: true,
                }
              );
            },
            {
              onlyOnce: true,
            }
          );
        });
      } else {
        setHasData(false);
      }
    });
  }, []);

  return (
    <Box>
      {data ? (
        data.map((info, index) => {
          return (
            <Contact
              onClick={() => {
                props.setMnav({
                  src: info.photoURL,
                  name: info.name,
                });
                props.setUid(info.uid);
                props.setWidth("0%");
                props.setXwidth("100%");
              }}
              {...info}
              key={index}
            />
          );
        })
      ) : (
        <Box>
          {hasData ? (
            <Box>

              <SkeletonContact/>
              <SkeletonContact/>
              <SkeletonContact/>
              <SkeletonContact/>
              <SkeletonContact/>
              <SkeletonContact/>
              <SkeletonContact/>
              <SkeletonContact/>
              <SkeletonContact/>
            </Box>
          ) : (
            <Text
              d="flex"
              h="80vh"
              w="100%"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              fontSize={26}
              fontWeight={600}
              color="#137284"
            >
              No Message to show Start Chating now.
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
