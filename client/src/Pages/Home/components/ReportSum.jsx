import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Tesseract from 'tesseract.js';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaExclamationTriangle, FaRedo } from 'react-icons/fa';

function ReportSum() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null); // For preview of uploaded files
  const [urlInput, setUrlInput] = useState(''); // URL input state

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileType = file.type;

    setError('');
    setText('');
    setSummary('');
    setLoading(true);
    setPreview(null);

    if (fileType === 'application/pdf') {
      handlePdf(file);
      setPreview(file.name); // Show file name for PDFs
    } else if (fileType.startsWith('image/')) {
      handleImage(file);
      setPreview(URL.createObjectURL(file)); // Show image preview
    } else {
      setError('Unsupported file format. Please upload a PDF or an image.');
      setLoading(false);
    }
  };

  const handlePdf = async (file) => {
    try {
      const text = await pdfToText(file);
      setText(text);
      await summarizeText(text);
    } catch (error) {
      console.error(error);
      setError('Error processing the PDF. Please try again.');
      setLoading(false);
    }
  };

  const handleImage = async (file) => {
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      setText(text);
      await summarizeText(text);
    } catch (error) {
      console.error(error);
      setError('Error processing the image. Please try again.');
      setLoading(false);
    }
  };


  const summarizeText = async (text) => {
    try {
      const response = await axios.post('http://localhost:3000/groqMedSummarise', { prompt: text }, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.status) {
        setSummary(response.data.summary.replaceAll("*", ""));
      } else {
        setError(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error summarizing the text. Please try again.');
      setLoading(false);
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
  
    setError('');
    setText('');
    setSummary('');
    setLoading(true);
    setPreview(null);
  
    if (!urlInput) {
      setError('Please enter a valid URL.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.get(urlInput, { responseType: 'blob' });
      const fileType = response.data.type;
  
      if (fileType === 'application/pdf') {
        handlePdf(response.data);
        setPreview(urlInput); // Show URL for PDFs
      } else if (fileType.startsWith('image/')) {
        handleImage(response.data);
        setPreview(urlInput); // Show image URL as preview
      } else {
        setError('Unsupported file format from URL. Please provide a URL for a PDF or an image.');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
  
      // Handle network error
      if (error.message === 'Network Error') {
        setError('Network error: Unable to reach the server. Please check your connection or server status.');
      } else if (error.response) {
        // The request was made and the server responded with a status code
        setError(`Error: ${error.response.status} - ${error.response.data}`);
      } else {
        // Something happened in setting up the request
        setError('An unknown error occurred while fetching the URL.');
      }
  
      setLoading(false);
    }
  };
  
  useEffect(()=>{
  
  document.title="Clinic New Report Summarizer";

  },[]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const typingEffect = summary ? { 
    initial: { opacity: 0 }, 
    animate: { opacity: 1 }, 
    transition: { duration: 0.5 }
  } : {};

  return (
    <div className="flex flex-col items-center justify-center pt-14 pb-14  bg-gray-100 min-h-screen">
      <motion.div
        {...getRootProps()}
        className="w-full max-w-4xl p-6 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center w-full h-48 border-dashed border-4 border-gray-300 rounded-lg bg-gray-50 p-4 text-center">
          <FaCloudUploadAlt className="text-6xl text-gray-500 mb-4" />
          <p className="text-gray-600">Drag and drop a PDF or image file here, or click to select files</p>
        </div>
      </motion.div>

      {/* URL input for file summarization */}
      <div className="mt-4 w-full max-w-4xl">
        <form onSubmit={handleUrlSubmit} className="flex items-center justify-center mt-4">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter the URL of a PDF or image"
          />
          <button type="submit" className="ml-4 p-2 bg-blue-500 text-white rounded-lg">Summarize </button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="mt-4 w-full max-w-5xl">
        {preview && (
          <div className="mt-4">
            {preview.endsWith('.pdf') ? (
              <p className="text-gray-700 p-2">Uploaded PDF: {preview}</p>
            ) : (
              <img src={preview} alt="Image Preview" className="max-h-48 object-contain" />
            )}
          </div>
        )}
      </div>

      <div className="mt-8 w-full max-w-5xl">
        {error && (
          <motion.div
            className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExclamationTriangle className="mr-2" />
            <p>{error}</p>
            <button 
              onClick={() => setError('')} 
              className="ml-auto text-blue-500 hover:underline"
            >
              Try Again
            </button>
          </motion.div>
        )}
        {loading && (
          <div className="mt-4 flex items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"/>
            </svg>
            <span className="ml-4 text-gray-700">Summarizing...</span>
          </div>
        )}          
        {summary && (
          <motion.div
            className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md"
            {...typingEffect}
          >
            <h3 className="text-xl font-semibold">Summary:</h3>
            <pre className="whitespace-pre-wrap text-gray-700">
              {summary.split('').map((char, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.01 }}
                >
                  {char}
                </motion.span>
              ))}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ReportSum;
