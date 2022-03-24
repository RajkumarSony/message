import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { getBlob, ref as str } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import { IoMdPlay, IoMdPause} from "react-icons/io";
import {MdDownloadForOffline} from "react-icons/md"
export default function AudioPlay(props) {
  const [playerVal, setPlayerVal] = useState(0);
  const [paused, setPaused] = useState(true);
const [downloaded, setDownloaded] = useState(false)
  const player = useMemo(() => new Audio(), []);
  const strRef = str(storage, props.url);
  const session=props.Session
  const playtoggle = () => {
    if (player.paused) {
      player.play();
      setPaused(false);
    } else {
      player.pause();
      setPaused(true);
    }
  };
  const download = () => {
    getBlob(strRef)
      .then((encryptedBlob) => {
        session.decryptFile(encryptedBlob).then((clearBlob) => {
          const audioClearBlob = new Blob([clearBlob.data], {
            type: "audio/mp3",
          });

          const url = URL.createObjectURL(audioClearBlob);
          player.src=url
          setDownloaded(true)
        });
      })
      .catch((err) => {
        console.log(err.code);
      });
  };
  useEffect(() => {
    player.ontimeupdate = () => {
      setPlayerVal((player.currentTime / player.duration) * 100);
      if (player.currentTime === player.duration) {
        setPaused(true);
      }
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      w="18rem"
      maxW="100%"
    >
      <Icon
        as={downloaded ? (paused ? IoMdPlay : IoMdPause) : MdDownloadForOffline}
        w={8}
        onClick={downloaded ? playtoggle : download}
        cursor="pointer"
        h={8}
        color="rgba(150,150,150,1)"
        _hover={{ color: "green" }}
        mr="0.7rem"
      />
      <Slider
        value={playerVal}
        onChange={(v) => {
          setPlayerVal(v);
          player.currentTime = player.duration * (+v / 100);
          if (player.paused) {
            player.play();
            setPaused(false);
          }
        }}
        aria-label="slider-ex-2"
        w="70%"
        colorScheme="pink"
        defaultValue={0}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
