import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { SignUp, Login, Home, Results } from './pages';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<><Navbar></Navbar><Home></Home></>} />
          <Route path='/results' element={<><Navbar></Navbar><Results></Results></>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
