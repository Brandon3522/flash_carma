import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import Login from './Login';
import Navbar from './Navbar';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider>
      <Login />
      {/* <Navbar /> */}
    </ChakraProvider>
  </StrictMode>
);
