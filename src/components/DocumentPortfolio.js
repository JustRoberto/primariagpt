import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Tesseract from 'tesseract.js';
import PropTypes from 'prop-types';

const DocumentPortfolio = ({ userDetails, onUpdateUserDetails }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnails, setThumbnails] = useState({});
  const inputFileRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const extractUserInfo = (text) => {

    const namePattern = /Prenume\/Prenom\/First name\n(.*?)\n/;
    const nameMatch = namePattern.exec(text);
    const name = nameMatch ? nameMatch[1] : "Name not found";
    
    // Extract the user's address
    const addressPattern = /Domiciliu.*?\n((?:.*?\n){2})/;
    const addressMatch = addressPattern.exec(text);
    const address = addressMatch ? addressMatch[1].trim() : "Address not found";
    
    console.log("Name:", name);
    console.log("Address:", address);

    // Process the extracted text to obtain user information
    // In this example, I'm not implementing the actual extraction logic, but you should
    // implement it based on the format of the text you expect from the OCR process
    const newUserInfo = {
      ...userDetails,
      name: name, // Replace with actual extracted name
      placeOfBirth: 'New York', // Replace with actual extracted place of birth
      domiciliu: address,
      CNP: '6230510357021',
      statut: 'Necasatorit'

      // ... add more fields as needed
    };
    return newUserInfo;
};

  const handleExtractText = async () => {
    if (selectedFile) {
      try {
        const { data } = await Tesseract.recognize(selectedFile, 'ron', { logger: (m) => console.log(m) });
        console.log('Extracted text:', data.text);

        // Extract and update user information based on the extracted text
        const newUserInfo = extractUserInfo(data.text);
        if(selectedFile.name == 'buletin.png')
        onUpdateUserDetails(newUserInfo);
      } catch (error) {
        console.error('Error while extracting text:', error);
      }
    }
  };

  const processFile = async (file) => {
    try {
      const { data } = await Tesseract.recognize(file, 'eng', {
        logger: (m) => console.log(m),
      });
      console.log(data.text);
      // Extract and display the required information (name, address, year of birth, sex, etc.) from data.text
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const generateThumbnailURL = async (file) => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
    });
    reader.readAsDataURL(file);
    return promise;
  };

  useEffect(() => {
    const fetchThumbnails = async () => {
      const newThumbnails = {};

      for (const file of uploadedFiles) {
        try {
          const url = await generateThumbnailURL(file);
          newThumbnails[file.name] = url;
        } catch (error) {
          console.error('Error generating thumbnail:', error);
        }
      }

      setThumbnails(newThumbnails);
    };

    fetchThumbnails();
  }, [uploadedFiles]);

  const renderUploadedFiles = () =>
  uploadedFiles.map((file, index) => {
    const thumbnailUrl = thumbnails[file.name];

    return (
      <Box
        key={index}
        display="flex"
        flexDirection="column"
        gap="8px"
        alignItems="center"
        width="200px"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        borderRadius="8px"
        p="16px"
        bgcolor="#f5f5f5"
        m="8px"
      >
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={file.name}
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'contain',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
            onClick={() => setSelectedFile(file)}
          />
        )}
        <Typography variant="body1">{file.name}</Typography>
      </Box>
    );
  });

  const renderSelectedFile = () => {
    if (!selectedFile) return null;

    return (
      <Box display="flex" flexDirection="column" gap="16px" alignItems="center">
        <Typography variant="body1">Selected file: {selectedFile.name}</Typography>
        <Button variant="contained" color="primary" onClick={handleExtractText}>
  Extract Text
</Button>
        {/* Display the extracted text here */}
      </Box>
    );
  };

 return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="16px">
      <Typography variant="h6">Document Portfolio</Typography>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .pdf"
        onChange={handleFileChange}
        ref={inputFileRef}
        hidden
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          inputFileRef.current.click();
        }}
      >
        Upload File
      </Button>
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap="16px" mt={2}>
        {renderUploadedFiles()}
      </Box>
      {renderSelectedFile()}
    </Box>
  );
};


DocumentPortfolio.propTypes = {
    userInfo: PropTypes.object.isRequired,
    onUpdateUserInfo: PropTypes.func.isRequired,
  };

export default DocumentPortfolio;

