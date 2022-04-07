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
  Spinner,
} from "@chakra-ui/react";
import {
  MdSend,
  MdMic,
  MdStop,
  MdOutlineEmojiEmotions,
  MdOutlineCancel,
} from "react-icons/md";
import { TiAttachmentOutline } from "react-icons/ti";

import { auth, db, storage } from "../../FirebaseConfig";
import axios from "axios";
import { onValue, ref, get } from "firebase/database";
import { ref as str, uploadBytes } from "firebase/storage";
import { getSealdSDKInstance } from "../../SealedInit";
import { BiLockAlt } from "react-icons/bi";
import 'emoji-picker-element'
import MicRecorder from "mic-recorder-to-mp3";
import AudioPlay from "./AudioPlay";
import Message from "./Message";
import { useThemeConfig } from "../../ThemeConfig";

export default function Messanger(props) {
  const config = useThemeConfig();
  const [showPicker, setShowPicker] = useState(false);
  const [micIcon, setMicIcon] = useState(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [Val, setVal] = useState("");
  const [y, setY] = useState("-100%");
  const [recording, Setrecording] = useState(false);
  const inputFocus = useRef();
  const Picker = useRef(null);
  const [playerVal, setPlayerVal] = useState(0);
  const [pAudio, setpAudio] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mesLoad, setmesLoad] = useState(true);
  const recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);
  const player = useMemo(() => new Audio(), []);
  const handelChange = (event) => {
    setVal(event.target.value);
    if (event.target.value === "") {
      setMicIcon(true);
    } else {
      setMicIcon(false);
    }
  };

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
          player.src = URL.createObjectURL(blob);
          setAudioBlob(blob);
          setpAudio(true);
          player.play();
          player.ontimeupdate = () => {
            setPlayerVal((player.currentTime / player.duration) * 100);
            // console.log((player.currentTime / player.duration) * 100);
            // console.log(playerVal);
          };
        })
        .catch((err) => {
          Setrecording(false);
          console.log(err);
        });
    }
  };

  const DiscardAudio = () => {
    setpAudio(false);
    URL.revokeObjectURL(player.src);
    setAudioBlob(null);
  };
  const handleSubmit = () => {
    if (Val !== "" || pAudio) {
      inputFocus.current?.focus();
      setLoading(true);
      // SOlve this Error of not updation
      get(ref(db, `${auth.currentUser.uid}/chats/${props.uid}/sessionId`))
        .then((data) => {
          if (data.val()) {
            getSealdSDKInstance()
              .retrieveEncryptionSession({ sessionId: data.val() })
              .then((session) => {
                if (Val !== "") {
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
                } else if (pAudio) {
                  session
                    .encryptFile(audioBlob, "file.mp3")
                    .then((encryptedBlob) => {
                      // console.log("clear",audioBlob)
                      // console.log("enc",encryptedBlob)
                      const audioPath = `Audio/${
                        auth.currentUser.uid
                      }/send/${Date.now()}.mp3`;
                      const audioStr = str(storage, audioPath);
                      uploadBytes(audioStr, encryptedBlob, {
                        contentType: "audio/mp3",
                      })
                        .then((snapshot) => {
                          console.log("uploaded ......");
                          axios.post(
                            "/sendmessage",
                            {
                              url: `${audioPath}`,
                              Recipetuid: props.uid,
                              uid: auth.currentUser.uid,
                            },
                            {
                              headers: {
                                authorization: auth.currentUser.accessToken,
                                "Content-Type": "application/json",
                              },
                            }
                          );
                          setAudioBlob(null);
                          setpAudio(false);
                          URL.revokeObjectURL(player.src);
                          setLoading(false);
                        })
                        .catch((err) => {
                          console.log(err);
                          setLoading(false);
                        });
                    });
                }
              });
          } else {
            getSealdSDKInstance()
              .createEncryptionSession({ userIds: [props.uid] })
              .then((session) => {
                if (Val !== "") {
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
                } else if (pAudio) {
                  session
                    .encryptFile(audioBlob, "file.mp3")
                    .then((encryptedBlob) => {
                      const audioPath = `Audio/${
                        auth.currentUser.uid
                      }/send/${Date.now()}.mp3`;
                      const audioStr = str(storage, audioPath);
                      uploadBytes(audioStr, encryptedBlob)
                        .then((snapshot) => {
                          console.log("uploaded ......");
                          axios.post(
                            "/sendmessage",
                            {
                              url: `${audioPath}`,
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
                          );
                          setAudioBlob(null);
                          setpAudio(false);
                          URL.revokeObjectURL(player.src);
                          setLoading(false);
                        })
                        .catch((err) => {
                          console.log(err);
                          setLoading(false);
                        });
                    });
                }
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

  useEffect(() => {
    scrollToBottom();
  }, [data]);
useEffect(() => {
 Picker.current?.addEventListener('emoji-click',(e)=>{
  inputFocus.current.focus();
      setVal(Val + e.detail.unicode);
      setMicIcon(false);
 })

}, [Picker,showPicker,Val])

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
            if (contact.val().type !== "audio" || !contact.val().type) {
              x.push({
                message: contact.val().message || "Deleted Message",
                send: contact.val().send,
                type: contact.val().type || "text",
                session: session,
              });
              count++;
              if (count === datax.size) {
                setData(x);
              
              }
            } else if (contact.val().type === "audio") {
              x.push({
                url: contact.val().url || "noURL",
                send: contact.val().send,
                type: contact.val().type,
                session: session,
              });
              count++;
              if (count === datax.size) {
                setData(x);
               
              }
            }
          });
        });
      } 
    });
  }, [props.uid]);
  useEffect(() => {
    console.log(mesLoad);
  }, [mesLoad]);
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
        backgroundColor={config.mesBg}
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
              <>
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
                    backgroundColor={mes.send ? config.chatL : config.chatR}
                    flexDirection="row"
                    p={2}
                    minW={6}
                    minH={5}
                    w="fit-content"
                    h="fit-content"
                    maxW="70%"
                    whiteSpace="pre-line"
                  >
                    {" "}
                    {mes.type === "text" ? (
                      <Message {...mes} />
                    ) : (
                      <AudioPlay
                        url={mes.url}
                        Session={mes.session}
                        send={mes.send}
                        type={mes.type}
                        key={index}
                      />
                    )}
                  </Box>
                </Box>
              </>
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
                  backgroundColor={mesLoad ? "transparent" : "red.500"}
                  flexDirection="row"
                  p={2}
                  minW={6}
                  w="fit-content"
                  textAlign="center"
                >
                  {mesLoad ? (
                    <Spinner size="xl" color="red.500" />
                  ) : (
                    <Text>No Messages Start Chating Now</Text>
                  )}
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
          h="300px"
          bottom={y}
          transition="all 0.8s ease-in-out"
        >
          <emoji-picker ref={Picker} class={config.emoPic}  style={{height:"100%", width:"100%",zIndex:"100"}}></emoji-picker>
        </Box>
      )}
      <Box
        borderLeft="1px solid gray"
        backgroundColor={config.inputBg}
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
          {!pAudio ? (
            <Textarea
              onChange={handelChange}
              onKeyDown={handleKeyDown}
              isDisabled={props.uid ? false : true}
              backgroundColor="rgba(100,100,100,0.3)"
              resize="none"
              placeholder="Type Message"
             
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
            />
          ) : (
            <>
              <Icon
                as={MdOutlineCancel}
                onClick={DiscardAudio}
                mr="0.7rem"
                w={6}
                h={7}
                cursor="pointer"
                _hover={{ color: "red.600" }}
                color="red.300"
              />
              <Slider
                value={playerVal}
                onChange={(v) => {
                  setPlayerVal(v);
                  player.currentTime = player.duration * (+v / 100);
                  if (player.paused) {
                    player.play();
                  }
                }}
                aria-label="slider-ex-2"
                w={{ sm: "70%", xl: "88%", md: "83%" }}
                colorScheme="pink"
                defaultValue={0}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </>
          )}
        </Box>
        <Button
          type={micIcon ? (pAudio ? "submit" : "button") : "submit"}
          isLoading={loading}
          isDisabled={props.uid ? false : true}
          onClick={micIcon ? (pAudio ? handleSubmit : handleMic) : handleSubmit}
          variant="ghost"
        >
          <Icon
            color="rgba(18,140,126,1)"
            w={8}
            h={8}
            as={
              micIcon ? (recording ? MdStop : pAudio ? MdSend : MdMic) : MdSend
            }
          />
        </Button>
      </Box>
    </Box>
  );
}
