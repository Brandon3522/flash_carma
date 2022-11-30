import React from 'react';
import { SignUp, Login, Home, Edit, Study, Results, Settings, StudyDeckSelection, ViewStudyDecks} from './pages';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useAuthListener from './useAuthListener';
import UserContext from './UserContext';

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{user}}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/home' element={<><Navbar></Navbar><Home user={user}></Home></>} />
            <Route path='/results' element={<><Navbar></Navbar><Results user={user}></Results></>} />
            <Route path='/study' element={<><Navbar></Navbar><Study user={user}></Study></>} />
            <Route path='/edit' element={<><Navbar></Navbar><Edit user={user}></Edit></>} />
            <Route path='/viewstudydecks' element={<><Navbar></Navbar><ViewStudyDecks user={user}></ViewStudyDecks></>} />
            <Route path='/settings' element={<><Navbar></Navbar><Settings user={user}></Settings></>} />  
            <Route path='/studydeckselection' element={<><Navbar></Navbar><StudyDeckSelection user={user}></StudyDeckSelection></>} /> 
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
