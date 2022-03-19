import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Textarea,
  Icon,
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { MdSend, MdMic, MdStop, MdOutlineEmojiEmotions } from "react-icons/md";
import { TiAttachmentOutline } from "react-icons/ti";

import { auth, db } from "../../FirebaseConfig";
import axios from "axios";
import { onValue, ref, get } from "firebase/database";
import { getSealdSDKInstance } from "../../SealedInit";
import { BiLockAlt } from "react-icons/bi";
import Picker from "emoji-picker-react";
import MicRecorder from "mic-recorder-to-mp3";
export default function Messanger(props) {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [micIcon, setMicIcon] = useState(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [Val, setVal] = useState("");
  const [y, setY] = useState("-100%");
  const [recording, Setrecording] = useState(false);
  const inputFocus = useRef();
  const [playerVal, setPlayerVal] = useState(0)
  const [pAudio, setpAudio] = useState(false)
  const handelChange = (event) => {
    setVal(event.target.value);
    if (event.target.value === "") {
      setMicIcon(true);
    } else {
      setMicIcon(false);
    }
  };

  const recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);
  const handleMic = () => {
    console.log(recording);

    if (!recording) {
      recorder
        .start()
        .then(() => {
          Setrecording(true);
        })
        .catch((err) => {
          Setrecording(false);
          console.log(err);
        });
    } else {
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          Setrecording(false);
      
          console.log("Stopped");
          // console.log(blob);
          const player = new Audio(URL.createObjectURL(blob));
          setpAudio(true)
          player.play();
          player.ontimeupdate=()=>{
           setPlayerVal((player.currentTime / player.duration) * 100)
           console.log((player.currentTime / player.duration) * 100)
           console.log(playerVal)
          }
        })
        .catch((err) => {
          Setrecording(false);
          console.log(err);
        });
    }
  };

  const handleSubmit = () => {
    if (Val !== "") {
      inputFocus.current?.focus();
      setLoading(true);
      // SOlve this Error of not updation
      get(ref(db, `${auth.currentUser.uid}/chats/${props.uid}/sessionId`))
        .then((data) => {
          console.log(data.val());
          if (data.val()) {
            getSealdSDKInstance()
              .retrieveEncryptionSession({ sessionId: data.val() })
              .then((session) => {
                session.encryptMessage(Val).then((encryptMessage) => {
                  axios
                    .post(
                      "/sendmessage",
                      {
                        message: encryptMessage,
                        Recipetuid: props.uid,
                        uid: auth.currentUser.uid,
                      },
                      {
                        headers: {
                          authorization: auth.currentUser.accessToken,
                          "Content-Type": "application/json",
                        },
                      }
                    )
                    .then((res) => {
                      if (res.status === 201) {
                        setLoading(false);
                      }
                    })
                    .catch((error) => {
                      setLoading(false);
                    });
                });
              });
          } else {
            getSealdSDKInstance()
              .createEncryptionSession({ userIds: [props.uid] })
              .then((session) => {
                console.log(session.sessionId);
                session.encryptMessage(Val).then((encryptMessage) => {
                  axios
                    .post(
                      "/sendmessage",
                      {
                        message: encryptMessage,
                        Recipetuid: props.uid,
                        uid: auth.currentUser.uid,
                        sessionId: session.sessionId,
                      },
                      {
                        headers: {
                          authorization: auth.currentUser.accessToken,
                          "Content-Type": "application/json",
                        },
                      }
                    )
                    .then((res) => {
                      if (res.status === 201) {
                        setLoading(false);
                      }
                    })
                    .catch((error) => {
                      setLoading(false);
                    });
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setVal("");
      setMicIcon(true);
    }
  };

  const handleKeyDown = (event) => {
    if ((event.keyCode === 10 || event.keyCode === 13) && event.ctrlKey) {
      handleSubmit();
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleEmoji = () => {
    inputFocus.current.focus();
    setShowPicker(!showPicker);
    if (y === "-100%") {
      setY("55px");
    } else {
      setY("-100%");
    }
  };
  const onEmojiClick = (event, emojiObject) => {
    inputFocus.current.focus();
    setChosenEmoji(emojiObject);
    console.log(emojiObject.emoji);
    setVal(Val + emojiObject.emoji);
    setMicIcon(false);
  };
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    // Solve error message not showing decryption problem
    const contactsRef = ref(
      db,
      `${auth.currentUser.uid}/chats/${props.uid}/messages`
    );

    onValue(contactsRef, (datax) => {
      if (datax.hasChildren()) {
        let x = [];
        let count = 0;
        get(
          ref(db, `${auth.currentUser.uid}/chats/${props.uid}/sessionId`)
        ).then(async (sessionId) => {
          const session = await getSealdSDKInstance().retrieveEncryptionSession(
            { sessionId: sessionId.val() }
          );

          datax.forEach((contact) => {
            session
              .decryptMessage(contact.val().message)
              .then((decryptMessage) => {
                x.push({ message: decryptMessage, send: contact.val().send });
                count++;
                if (count === datax.size) {
                  setData(x);
                }
              });
          });
        });
      }
    });
  }, [props.uid]);

  return (
    <Box h="100%" flexDirection="column" d="flex">
      <Box
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#e5ebef",
            borderRadius: "34px",
          },
        }}
        backgroundColor="#bceef7"
        h="100%"
      >
        <Box
          minH={8}
          h="fit-content"
          m={5}
          mb="10px"
          d="flex"
          justifyContent="center"
        >
          <Box
            borderRadius={5}
            color="white"
            d="felx"
            justifyContent="center"
            alignItems="center"
            backgroundColor="yellow.500"
            flexDirection="row"
            p={2}
            minW={6}
            minH={8}
            h="fit-content"
            w="fit-content"
            textAlign="center"
          >
            <Text>
              <Icon color="white" as={BiLockAlt} /> Messages are end-to-end
              encrypted. No one outside of this chat, not even We , can read or
              listen to them{" "}
            </Text>
          </Box>
        </Box>
        {data ? (
          data.map((mes, index) => {
            return (
              <Box
                minH={8}
                key={index}
                m={5}
                d="flex"
                justifyContent={mes.send ? "flex-end" : "flex-start"}
                h="fit-content"
              >
                <Box
                  borderRadius={5}
                  d="felx"
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor={mes.send ? "#f0d1d1" : "#a2d7fc"}
                  flexDirection="row"
                  p={2}
                  minW={6}
                  minH={5}
                  w="fit-content"
                  h="fit-content"
                  maxW="70%"
                >
                  <p>{mes.message}</p>
                </Box>
              </Box>
            );
          })
        ) : (
          <>
            <Box h="100%" d="flex" alignItems="center" justifyContent="center">
              <Box
                minH={8}
                h="fit-content"
                m={5}
                mb={40}
                d="flex"
                justifyContent="center"
              >
                <Box
                  borderRadius={5}
                  color="white"
                  d="felx"
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor="red.500"
                  flexDirection="row"
                  p={2}
                  minW={6}
                  w="fit-content"
                  textAlign="center"
                >
                  <Text>No Messages Start Chating Now</Text>
                </Box>
              </Box>
            </Box>
          </>
        )}
        <Box ref={messagesEndRef}></Box>
      </Box>
      {showPicker && (
        <Box
          w={{ md: "60%", sm: "100%", lg: "70%" }}
          position="absolute"
          h="200px"
          bottom={y}
          transition="all 0.8s ease-in-out"
        >
          <Picker
            disableSearchBar={true}
            preload={true}
            pickerStyle={{ height: "100%", width: "100%" }}
            onEmojiClick={onEmojiClick}
          />
        </Box>
      )}
      <Box
        borderLeft="1px solid gray"
        backgroundColor="white"
        alignItems="center"
        h="60px"
        d="flex"
        flexDirection="row"
      >
        <Icon
          w={8}
          cursor="pointer"
          h={8}
          color="rgba(150,150,150,1)"
          as={TiAttachmentOutline}
          _hover={{ color: "green" }}
        />
        <Icon
          w={8}
          h={8}
          color="rgba(100,100,100,0.3)"
          onClick={handleEmoji}
          cursor="pointer"
          as={MdOutlineEmojiEmotions}
          _hover={{ color: "yellow" }}
        />

        <Box
          h={10}
          d="flex"
          borderRadius={40}
          alignItems="center"
          justifyContent="center"
          overflowY="hidden"
          w="100%"
        >
          {!pAudio? <Textarea
            onChange={handelChange}
            onKeyDown={handleKeyDown}
            isDisabled={props.uid ? false : true}
            backgroundColor="rgba(100,100,100,0.3)"
            resize="none"
            placeholder="Type Message"
            color="black"
            pt={6}
            style={{ border: "1px solid white", width: "100%" }}
            align="center"
            value={Val}
            ref={inputFocus}
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              height: "10px",
            }}
          />:<Slider  value={playerVal} aria-label='slider-ex-2' w="90%" colorScheme='pink' defaultValue={0}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>}
        </Box>
        <Button
          type={micIcon ? "button" : "submit"}
          isLoading={loading}
          isDisabled={props.uid ? false : true}
          onClick={micIcon ? handleMic : handleSubmit}
          variant="ghost"
        >
          <Icon
            color="rgba(18,140,126,1)"
            w={8}
            h={8}
            as={micIcon ? (recording ? MdStop : MdMic) : MdSend}
          />
        </Button>
      </Box>
    </Box>
  );
}
