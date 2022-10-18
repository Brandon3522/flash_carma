import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { SignUp, Login, Home, Results } from './pages';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
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
  );
}

export default App;
