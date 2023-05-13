import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import axios from 'axios';
import { OpenAIApi} from "openai";
import { Configuration } from "./Configuration";
import TypingAnimation from "./TypingAnimation";
const YOUR_API_KEY = "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";

const ChatGPTInterface = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const startSpeechRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Speech recognition is not supported in your browser. Please use Chrome for this feature."
      );
      return;
    }
  
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ro-RO";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log(transcript);
      const newMessage = {
        id: messages.length,
        text: transcript,
        isUserMessage: true,
      };
  
      processAiResponse(transcript, newMessage);
    };
  
    recognition.onerror = (event) => {
      console.error("Error during speech recognition:", event.error);
    };
  
    recognition.start();
  };
  
  const processAiResponse = async (transcript, newMessage) => {
    setIsAiTyping(true);
  
    const aiResponse = await callChatGPT(transcript);
  
    setIsAiTyping(false);
  
    const aiMessage = {
      id: messages.length + 1,
      text: aiResponse,
      isUserMessage: false,
    };
  
    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage,
      aiMessage,
    ]);
  };

  const callChatGPT = async (prompt) => {
    const headers = { 'Authorization': `Bearer ${YOUR_API_KEY}` }
   const messages = [
        {
          role: 'system',
          content:
          'Esti un asistent virtual al primariei Timisoara, te vei adresa cu respect si vei incerca sa ajuti fiecare utiliator sa isi rezolve problema. \n'+
          'Pentru asta fie il vei indruma spre una dintre paginile primarriei cum este https://sesizari.primariatm.ro/ unde utilizatorii pot raporta probleme fie  le vei spune pasii pe care trebuie sa ii urmeze si pe cine trebuie sa contacteze pentru a isi rezolva problemele birocratice. \n'+
          'Vei incerca sa fii eficient cu cuvintele astfel incat sa te incadrezi in 150 de cuvinte unde se poate. si sa sugerezi de fiecare data cand se poate unul din site-urile primariei.,\n'+
          'Site-urile utile ale primariei sunt :\n'+
          'https://sesizari.primariatm.ro/ aici se pot reclama diferite nereguli din oras\n'+
          'https://transparenta.primariatm.ro/ aici gasiti um sunt cheltuiți banii orașului, Ce plăți a făcut școala la care merge copilul dvs si orice alta institutie din subordinea primariei, Cât a costat o lucrare de reparații în cartier sau  renovarea unei aripi de spital. Cât a cheltuit primăria pe hârtii.\n'+
          'https://buget.primariatm.ro/ aici veti gasii detaliat bugetul Timisoarei pe acest an si fiecare cheltuiala sau investitie planificata in anul 2023 (acesta)\n'+
          'https://plata.dfmt.ro/ aici se pot platii Impozite şi taxe locale datorate bugetului local al Municipiului Timisoara precum si amenzi contravenţionale. Plata cu cardul prin ATLAS nu este comisionată.\n'+
          '\n'+
          'In cazul in care utilizatorul doreste sa isi reinoiasca sau schimbe buletinul asta trebuie sa stie :\n'+
          '1.Cererile se depun cu programare online.\n'+
          '2.Pentru a preveni aglomerația în sediul nostru vă rugăm să vă prezentaţi cu cel mult de 10 minute înainte de ora programării.\n'+
          '3.Vă rugăm să plătiţi online taxa aferentă (cu cardul bancar pe site-ul https://plata.dfmt.ro/ dar se poate si fizic la ghiseu).\n'+
          '4.Documente necesare pentru eliberarea actului de identitate sunt { Cerere pentru eliberarea actului de identitate (Anexa 1)\n'+
          'se va imprima FAŢĂ-VERSO, pe o singură foaie A4 ,actul de identitate şi cartea de alegător, dacă este cazul. Actul de identitate valabil rămâne în posesia titularului până la data înmânării noului document.,certificatul de naştere, în original şi copie,certificatul de căsătorie, în original şi copie, documentul cu care se face dovada adresei de domiciliu (contract vanzare, extras CF la zi, etc.), dovada achitării taxei reprezentând contravaloarea cărţii de identitate – chitanța în cazul taxei achitate la casierie, sau extras de cont / raport tranzacție finalizată (tipărit / format electronic), în cazul plății online\n'+
          '5. Detalii suplimentare pe site-ul : https://www.primariatm.ro/acte-de-identitate/, de asemenea aici se gasesc cererile de descarcat.'        },
        {
          role: 'user',
          content: prompt,
        },
      ];
     // Return the axios promise
  return axios
  .post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 150,
    },
    { headers }
  )
  .then((response) => {
    console.log(response.data.choices[0].message.content);
    // Return the AI response content
    return response.data.choices[0].message.content;
  });
};
  
  const parseMessage = (message) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(urlPattern);

    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputText !== "") {
      handleSendButtonClick();
      event.preventDefault(); // Prevent the default form submission behavior
    }
  };

  const handleSendButtonClick = async () => {
    if (inputText === "") return;
    const userMessage = {
      id: messages.length,
      text: inputText,
      isUserMessage: true,
    };
  
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    setInputText('');
  
    setIsAiTyping(true);
  
    const aiResponse = await callChatGPT(inputText);
  
    setIsAiTyping(false);
  
    const aiMessage = {
      id: messages.length + 1,
      text: aiResponse,
      isUserMessage: false,
    };
  
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };
  const chatGPTInterfaceStyle = {
    width: "60%",
    margin: "0 auto",
  };

  const renderMessages = () =>
  messages.map((message) => (
    <Box
      key={message.id}
      sx={{
        width: "fit-content",
        maxWidth: "80%",
        padding: "8px",
        borderRadius: "8px",
        border: message.isUserMessage
          ? "none"
          : "1px solid rgba(0, 0, 0, 0.12)",
        backgroundColor: message.isUserMessage
          ? "rgba(0, 0, 255, 0.12)"
          : "rgba(255, 255, 255, 0.12)",
        alignSelf: message.isUserMessage ? "flex-end" : "flex-start",
        marginBottom: "8px",
      }}
    >
      <Typography variant="body1">{parseMessage(message.text)}</Typography>
    </Box>
  )).concat(isAiTyping ? [<TypingAnimation key="typing-animation" />] : []);
  return (
    <Box sx={chatGPTInterfaceStyle}>
      <Typography variant="h6">
        Sunt funcționarul tău AI, cu ce te pot ajuta?
      </Typography>
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
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendButtonClick}
          >
            Send
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={startSpeechRecognition}
          >
            <MicIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatGPTInterface;
