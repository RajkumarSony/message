import React, { useState, useEffect } from "react";
import ContactList from "../components/Web/ContactList";
import Messanger from "../components/Web/Messanger";
import ContactNav from "../components/Web/ContactNav";
import AddContact from "../components/Web/AddContact";
import MessageNav from "../components/Web/MessageNav";
import { Box ,Text,Icon} from "@chakra-ui/react";
// import {BiNotification,BiNotificationOff} from "react-icons/bi"
import { Navigate } from "react-router-dom";
import { auth, db,messaging } from "../FirebaseConfig";

import RecentMsg from "../components/Web/RecentMsg";
import UpdateProfile from "../components/Web/UpdateProfile";
import { onValue, ref } from "firebase/database";
import { getToken ,onMessage} from "firebase/messaging";
import axios from "axios";

export default function Web() {
  const [Mnav, setMnav] = useState({
    src: "",
    name: "",
    Uid: "",
  });
  const [width, setWidth] = useState("100%");
  const [xwidth, setXwidth] = useState("0%");
  const [popupContact, setPopup] = useState(false);
  const [popupContactList, setPopupContactList] = useState("-100%");
  const [url, setUrl] = useState();
  const [popupProfile, setPopupProfile] = useState(false);
// const [notification, Setnotification] = useState(false)
  const [error, setError] = useState({
    error: false,
    code: null,
    message: null,
  });

  const [uid, setUid] = useState(null);
  const updatePopup = () => {
    setPopup(!popupContact);
    setPopupProfile(false);

    setError({
      error: false,
      code: null,
      message: null,
    });
  };
  const updateSetError = (err) => {
    setError(err);
  };
  const updatesetMnav = (x) => {
    setMnav(x);
  };
  const updatesetUid = (x) => {
    setUid(x);
  };
  const updatesetWidth = (x) => {
    setWidth(x);
  };
  const updatesetXwidth = (x) => {
    setXwidth(x);
  };
  const updatePopupProfile = () => {
    setPopupProfile(!popupProfile);
    setPopup(false);
  };
  const updatepopupContactList = () => {
    if (popupContactList === "-100%") {
      setPopupContactList("0%");
    } else {
      setPopupContactList("-100%");
    }
  };
  useEffect(() => {
    if (auth.currentUser) {
    getToken(messaging,{vapidKey:process.env.REACT_APP_vapidkey}).then((currentToken)=>{
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...

        axios.post("/notification",{
          token:currentToken
        },{
          headers:{
            authorization: auth.currentUser.accessToken,
            "Content-Type": "application/json",
          }
        }).then(res=>{
          console.log(res.status)
        }).catch(err=>{
          console.log(err)
        })
        // Setnotification(true)
        console.warn("token: ", currentToken)
      } else {  
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // Setnotification(false)

        // ...
      }
    }).catch((error)=>{
      console.log("rejected Permission")
      console.log(error.code)
      // Setnotification(false)
    })
  }
    }, [])
    useEffect(() => {
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
       
        // ...
      });
    }, [])
  useEffect(() => {
    if (auth.currentUser) {
      onValue(ref(db, `${auth.currentUser.uid}/PersonalInfo/photoURL`), (snapshot) => {
        setUrl(snapshot.val());
      });
    }
  }, []);

  if (auth.currentUser) {
    const updateWidth = () => {
      setWidth("100%");
      setXwidth("0%");
    };

    return (
      <>
      <Box
        d="flex"
        position="absolute"
        scroll="none"
        flexDirection="row"
        h="100vh"
        w="100vw"
        overflow="hidden"
      >
        <Box
          d="flex"
          flexDirection="column"
          h="100vh"
          overflow="hidden"
          w={{ md: "40%", sm: width, lg: "30%" }}
        >
          <Box w="100%" h={{ md: "7vh", sm: "9vh", lg: "8vh" }}>
            <ContactNav
              profile={updatePopupProfile}
              contactList={updatepopupContactList}
              name={auth.currentUser.displayName}
              src={url}
            />
          </Box>
          <Box
            h={{ md: "93vh", sm: "91vh", lg: "92vh" }}
            mt={{ md: "5px" }}
            overflowY=""
          >
            <Box
              d={!popupContact && !popupProfile ? "block" : "none"}
              h="100%"
              overflowY="scroll"
              w="100%"
              transition="display 1s fade"
              zIndex={-1}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              backgroundColor="#d8c9e3"
            >
              <RecentMsg
                setMnav={updatesetMnav}
                setUid={updatesetUid}
                setWidth={updatesetWidth}
                setXwidth={updatesetXwidth}
              />
            </Box>

            <Box
              d={popupContact ? "block" : "none"}
              transition="display 1s fade"
              h="100%"
            >
              <AddContact
                updatePopup={updatePopup}
                popupContactList={updatepopupContactList}
                setError={updateSetError}
                error={error}
              />
            </Box>
            <Box d={popupProfile ? "block" : "none"}>
              <UpdateProfile  profile={updatePopupProfile} url={url} />
            </Box>
          </Box>
          <Box
            position="fixed"
            left={popupContactList}
            h="100%"
            overflowY="scroll"
            w={{ md: "40%", sm: width, lg: "30%" }}
            transition="left 0.45s ease-in-out"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            backgroundColor="#d8c9e3"
          >
            <ContactList
              setMnav={updatesetMnav}
              popupContactList={updatepopupContactList}
              setUid={updatesetUid}
              setWidth={updatesetWidth}
              setXwidth={updatesetXwidth}
              popup={updatePopup}
              po={popupContact}
            />
          </Box>
        </Box>
        <Box
          h="100vh"
          zIndex="1"
          w={{ md: "60%", sm: xwidth, lg: "70%" }}
          d={{md:uid ? "block" : "none",sm:"block"}}
        >
          <Box w="100%" h={{ md: "7vh", sm: "9vh", lg: "8vh" }}>
            <MessageNav updateWidth={updateWidth} {...Mnav} />
          </Box>
          <Box
            h={{ md: "93vh", sm: "91vh", lg: "92vh" }}
            mt={{ md: "5px" }}
            w="100%"
          >
            <Messanger uid={uid} />
          </Box>
        </Box>
        <Box
          h="100vh"
          zIndex="1"
          w={{ md: "60%", sm: xwidth, lg: "70%" }}
          color="white"
          backgroundColor="#bceef7"
          d={{md:!uid?"flex":"none",sm:"none"}}
          justifyContent="center"
          alignItems="center"
        >
          <Text textAlign="center" fontSize={26} fontWeight={600}>
            Select Contact to Send Message
          </Text>
        </Box>
      </Box>
     

      </>
    );
  }
  return <Navigate to="/auth/login" />;
}
