import React from 'react';
import { SignUp, Login, Home, Edit, Study, Results, ViewStudyDecks, Settings, StudyDeckSelection} from './pages';
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
          <Route path='/study' element={<><Navbar></Navbar><Study></Study></>} />
          <Route path='/edit' element={<><Navbar></Navbar><Edit></Edit></>} />
          <Route path='/viewstudydecks' element={<><Navbar></Navbar><ViewStudyDecks></ViewStudyDecks></>} />
          <Route path='/settings' element={<><Navbar></Navbar><Settings></Settings></>} />  
          <Route path='/studydeckselection' element={<><Navbar></Navbar><StudyDeckSelection></StudyDeckSelection></>} /> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
