import React, { useState, useEffect } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { auth, db } from "../../FirebaseConfig";
import { ref, onValue, query, orderByChild } from "firebase/database";
import Contact from "./Contact";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlinePlusSquare, AiOutlineCloseSquare } from "react-icons/ai";
import SkeletonContact from "./SkeletonContact";
export default function ContactList(props) {
  const [data, setData] = useState();
  const [hasData, setHasData] = useState(true);
  useEffect(() => {
    onValue(
      query(ref(db, `${auth.currentUser.uid}/contacts`), orderByChild("name")),
      (datax) => {
        let x = [];
        if (datax.hasChildren()) {
          let count = 0;
          datax.forEach((data) => {
            onValue(ref(db,`${data.val().uid}/PersonalInfo`),(snap)=>{
              x.push({
                name:snap.val().name,
              
                uid:snap.val().uid,
                photoURL:snap.val().photoURL,

              })
              count++;
              if (count === datax.size) {
                setData(x);
              }
            },{
              onlyOnce:true
            });
          });
        } else {
          setHasData(false);
        }
      }
    );
  }, []);

  return (
    <Box>
      <Box
        boxSizing="content-box"
        pb={{ md: "5px" }}
        d="flex"
        alignItems="center"
        backgroundColor="#4ab0b0"
        justifyContent="space-between"
        h={{ md: "7vh", sm: "9vh", lg: "8vh" }}
      >
        <Box h="100%" alignItems="center" d="flex">
          <Icon
            color="white"
            fontSize={28}
            cursor="pointer"
            mr={2}
            onClick={props.popupContactList}
            as={IoMdArrowRoundBack}
          />
          <Text color="white" cursor="pointer" fontWeight={800} fontSize={28}>
            New Chat
          </Text>
        </Box>
        <Icon
          color="white"
          cursor="pointer"
          mr={3}
          onClick={() => {
            props.popup();
            props.popupContactList();
          }}
          fontSize={28}
          as={!props.po ? AiOutlinePlusSquare : AiOutlineCloseSquare}
        />
      </Box>
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
        <Box
          d="flex"
          h="80vh"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
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
              textAlign="center"
              fontSize={26}
              fontWeight={600}
              color="#137284"
            >
              No Contact's Add Contact to Message.
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
