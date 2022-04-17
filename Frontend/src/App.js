import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavigationBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { AppContext, socket } from './context/appContext';

function App() {
  const user = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [member, setMember] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState([]);
  const [newMessages, setNewMessages] = useState({});

  return (
    <AppContext.Provider value={{
      socket,
      rooms, setRooms,
      currentRoom, setCurrentRoom,
      member, setMember,
      messages, setMessages,
      privateMemberMsg, setPrivateMemberMsg,
      newMessages, setNewMessages
    }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
