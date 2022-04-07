import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
  Text
} from "@chakra-ui/react";
import { getBlob, ref as str } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { MdDownloadForOffline } from "react-icons/md";

const convertHMS = (value) => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
 
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return ( hours==0? "":hours+ ":" ) + minutes+ ":"  + seconds; // Return is HH : MM : SS
};


export default function AudioPlay(props) {
  const [playerVal, setPlayerVal] = useState(0);
  const [paused, setPaused] = useState(true);
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const player = useMemo(() => new Audio(), []);
  const [duration, setDuration] = useState("0:00");
  const [time, setTime] = useState("0:00")
  const strRef = str(storage, props.url);
  const session = props.Session;
  
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
    setLoading(true);
    getBlob(strRef)
      .then((encryptedBlob) => {
        session.decryptFile(encryptedBlob).then((clearBlob) => {
          const audioClearBlob = new Blob([clearBlob.data], {
            type: "audio/mp3",
          });

          const url = URL.createObjectURL(audioClearBlob);
          player.src = url;
          setDownloaded(true);
          setLoading(false);
          setTimeout(()=>{
            setDuration(convertHMS(player.duration))

          },1000)

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
      setTime(convertHMS(player.currentTime))
      setDuration(convertHMS(player.duration))


    };
   
  }, []);
useEffect(()=>{
  setDuration(convertHMS(player.duration))
})
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
        as={
          downloaded
            ? paused
              ? IoMdPlay
              : IoMdPause
            : loading
            ? Spinner
            : MdDownloadForOffline
        }
        w={8}
        onClick={downloaded ? playtoggle : download}
        cursor="pointer"
        h={8}
        color="rgba(150,150,150,1)"
        _hover={{ color: "green" }}
        mr="0.7rem"
      />
      <Box  w="70%">

      
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
        w="100%"
        colorScheme="pink"
        defaultValue={0}
        
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb zIndex="0"/>
      </Slider>
      <Text fontSize="9px">
      {downloaded? time+"/"+duration : "" }
      </Text>
      </Box>
    </Box>
  );
}