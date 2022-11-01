import React from 'react';
import { SignUp, Login, Home, EditPage, StudyPage, Results } from './pages';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<><Navbar></Navbar><Home></Home></>} />
          <Route path='/results' element={<><Navbar></Navbar><Results></Results></>} />
          <Route path='/study' element={<><Navbar></Navbar><StudyPage></StudyPage></>} />
          <Route path='/editpage' element={<><Navbar></Navbar><EditPage></EditPage></>} />
          <Route path='/view' element={<><Navbar></Navbar></>} /> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
