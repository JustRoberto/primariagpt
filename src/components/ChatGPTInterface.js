import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const ChatGPTInterface = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const parseMessage = (message) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(urlPattern);
  
    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const handleSendButtonClick = () => {
    const newMessage = {
      id: messages.length,
      text: inputText,
      isUserMessage: true,
    };
  
    const aiResponse = {
      id: messages.length + 1,
      text: 'Nasol ce sa zic, ai incercat sa faci o sesizare pe https://sesizari.primariatm.ro/ ?',
      isUserMessage: false,
    };
  
    setMessages((prevMessages) => [...prevMessages, newMessage, aiResponse]);
    setInputText('');
  };

  const chatGPTInterfaceStyle = {
    width: '60%',
    margin: '0 auto',
  };

  const renderMessages = () =>
  messages.map((message) => (
    <Box
      key={message.id}
      sx={{
        width: 'fit-content',
        maxWidth: '80%',
        padding: '8px',
        borderRadius: '8px',
        border: message.isUserMessage ? 'none' : '1px solid rgba(0, 0, 0, 0.12)',
        backgroundColor: message.isUserMessage ? 'rgba(0, 0, 255, 0.12)' : 'rgba(255, 255, 255, 0.12)',
        alignSelf: message.isUserMessage ? 'flex-end' : 'flex-start',
        marginBottom: '8px',
      }}
    >
      <Typography variant="body1">{parseMessage(message.text)}</Typography>
    </Box>
  ));
  
    return (
      <Box sx={chatGPTInterfaceStyle}>
        <Typography variant="h6">Sunt funcționarul tău AI, cu ce te pot ajuta?</Typography>
        <Box display="flex" flexDirection="column" gap="16px" my={2}>
          <Box
            display="flex"
            flexDirection="column"
            gap="16px"
            maxHeight="400px"
            overflow="auto"
            mb={2}
          >
            {renderMessages()}
          </Box>
          <Box display="flex" gap="8px">
            <TextField
              label="Enter your prompt"
              variant="outlined"
              fullWidth
              value={inputText}
              onChange={handleInputChange}
            />
            <Button variant="contained" color="primary" onClick={handleSendButtonClick}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    );
};

export default ChatGPTInterface;
