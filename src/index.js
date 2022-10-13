import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import App from './App';
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider>
      <App />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={<><Navbar></Navbar><Home></Home></>} />
        </Routes>
      </BrowserRouter>
          <Route path='/home' element={<><Navbar></Navbar><Home></Home></>} />
    </ChakraProvider>
  </StrictMode>
);
