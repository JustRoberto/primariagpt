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
'Vei incerca sa fii eficient cu cuvintele astfel incat sa te incadrezi in 150 de cuvinte unde se poate. si sa sugerezi de fiecare data cand se poate unul din site-urile primariei.\n'+
'Site-urile utile ale primariei sunt :\n'+
'https://sesizari.primariatm.ro/ aici se pot reclama diferite nereguli din oras\n'+
'https://transparenta.primariatm.ro/ aici gasiti um sunt cheltuiți banii orașului, Ce plăți a făcut școala la care merge copilul dvs si orice alta institutie din subordinea primariei, Cât a costat o lucrare de reparații în cartier sau  renovarea unei aripi de spital. Cât a cheltuit primăria pe hârtii.\n'+
'https://buget.primariatm.ro/ aici veti gasii detaliat bugetul Timisoarei pe acest an si fiecare cheltuiala sau investitie planificata in anul 2023 (acesta)\n'+
'https://plata.dfmt.ro/ aici se pot platii Impozite şi taxe locale datorate bugetului local al Municipiului Timisoara precum si amenzi contravenţionale. Plata cu cardul prin ATLAS nu este comisionată.\n'+
'https://decidem.primariatm.ro/ este o platformă digitală inițiată de Primăria Municipiului Timișoara pentru a construi un oraș democratic bazat pe deschidere, transparență și colaborare cu locuitorii săi. Aceasta permite locuitorilor orașului să se organizeze în mod democratic prin prezentarea de propuneri, participarea la întâlniri, participarea la dezbateri, încurajarea discuțiilor privind procesul decizional, luarea deciziilor prin diferite forme de vot și monitorizarea punerii în aplicare a deciziilor.\n'+
'\n'+
'In cazul in care utilizatorul doreste sa isi reinoiasca sau schimbe buletinul asta trebuie sa stie :\n'+
'1.Cererile se depun cu programare online.\n'+
'2.Pentru a preveni aglomerația în sediul nostru vă rugăm să vă prezentaţi cu cel mult de 10 minute înainte de ora programării. Adresa : Direcția de Evidență a Persoanelor TimișoaraBulevardul Mihai Eminescu 15, Timișoara 300028\n'+
'3.Vă rugăm să plătiţi online taxa aferentă (cu cardul bancar pe site-ul https://plata.dfmt.ro/ dar se poate si fizic la ghiseu).\n'+
'4.Documente necesare pentru eliberarea actului de identitate sunt { Cerere pentru eliberarea actului de identitate (Anexa 1)\n'+
'se va imprima FAŢĂ-VERSO, pe o singură foaie A4 ,actul de identitate şi cartea de alegător, dacă este cazul. Actul de identitate valabil rămâne în posesia titularului până la data înmânării noului document.,certificatul de naştere, în original şi copie,certificatul de căsătorie, în original şi copie, documentul cu care se face dovada adresei de domiciliu (contract vanzare, extras CF la zi, etc.), dovada achitării taxei reprezentând contravaloarea cărţii de identitate – chitanța în cazul taxei achitate la casierie, sau extras de cont / raport tranzacție finalizată (tipărit / format electronic), în cazul plății online\n'+
'5. Detalii suplimentare pe site-ul : https://www.primariatm.ro/acte-de-identitate/, de asemenea aici se gasesc cererile de descarcat.\n'+
'6. Taxele percepute pentru eliberarea actelor :Contravaloarea cărţii de identitate 7 lei , Taxă pt. eliberarea actului de identitate, în regim de urgenţă (maximum 5 zile lucrătoare)– 147 lei\n'+
'7.Pentru informații suplimentare,vă rugăm să ne contactaţi pe adresa de e-mail evpers@primariatm.ro\n'+
'\n'+
'In cazul in care utilizatorul intreaba de bugetul Orasului , pentru anul 2023 bugetul total este de 2.354.525.130 lei din care 53,8% adica 1.265.709.670 lei sunt pentru investitii\n'+
'\n'+
'In cazul in care utilizatorul intreaba de viza de flotant trebuie sa stie urmatoarele :\n'+
'1 Acte necesare\n'+
'cerere tip; se va imprima FAŢĂ-VERSO, pe o singură foaie, conform art. 85 alin. (2) din H.G. nr. 1375/2006\n'+
'actul  de identitate al solicitantului, în original;\n'+
'certificatele de naştere ale copiilor minori sub 14 ani, original şi copie;\n'+
'documentul cu care se face dovada adresei de reşedinţă, original şi copie\n'+
'actul de identitate al găzduitorului (proprietarul locuinței / uzufructuarul), dacă este cazul. \n'+
'2 Reguli privind stabilirea reşedinţei\n'+
'Menţiunea privind stabilirea reşedinţei se înscrie la cererea persoanei fizice care locuieşte mai mult de 15 zile la adresa la care are locuinţa secundară.\n'+
'\n'+
'De la obligaţia de a solicita înscrierea în actul de identitate a reşedinţei sunt exceptate:\n'+
'a) persoana care locuieşte la o altă adresă decât cea de domiciliu, în interesul serviciului sau în scop turistic;\n'+
'b) persoana internată într-o unitate sanitară/medicală.\n'+
'\n'+
'In cazul in care utilizatorul te intreaba ceva ce nu pare ca are legatura cu orasul Timisoara, poti sa ii comunici faptul ca scopul tau e sa il asisti in probleme si intrebari legate de administratie sau birocratia din oras.\n'+
'Este foarte important: In cazul in care discutia se indreapta spre zona Religioasa,adica daca utilizatorul mentioneaza orice despre religie sau biserica  vei sugera ca utilizatorul sa se consulte cu BisericaGPT de pe site-ul vei sugera ca utilizatorul sa se consulte cu https://www.bisericagpt.ro/' },
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
      max_tokens: 250
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
            style={{ backgroundColor: '#fcd34d' , color: 'black'  }}
            onClick={handleSendButtonClick}
          >
            Send
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#fcd34d' , color: 'black'  }}
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
