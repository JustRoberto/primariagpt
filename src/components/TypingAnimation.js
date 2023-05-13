import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect} from "react";

const TypingAnimationText = styled("span")`
  display: inline-block;
  animation: typingAnimation 1s steps(4) infinite;

  @keyframes typingAnimation {
    0% {
      content: "▁▁▁▁▁";
    }
    33% {
      content: "█▃▁▁  ";
    }
    66% {
      content: "██▆▁▁ ";
    }
    100% {
      content: "██████████";
    }
  }
`;

const TypingAnimation = () => {
    const [dotIndex, setDotIndex] = useState(0);
    const dots = [" ", ".", "..", "..."];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setDotIndex((prevIndex) => (prevIndex + 1) % dots.length);
      }, 300);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "8px",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          alignSelf: "flex-start",
          marginBottom: "8px",
        }}
      >
        <Typography variant="body1">{dots[dotIndex]}</Typography>
      </Box>
    );
  };
  export default TypingAnimation