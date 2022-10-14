import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import App from './App';
import { SignUp } from './routes';
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={<><Navbar></Navbar><Home></Home></>} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
