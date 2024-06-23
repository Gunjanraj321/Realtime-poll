import  React from 'react';
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Routes, Route } from "react-router-dom";
import Body from './components/Home/Body';
import PollResults from './components/Home/PollResults';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/body" element={<Body/>} />
        <Route path="/poll/:pollId/results" element={<PollResults/>} />
      </Routes>
    </div>
  );
}

export default App;
