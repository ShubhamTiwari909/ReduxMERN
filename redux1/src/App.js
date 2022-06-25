import React, { useState,useEffect } from 'react'
// Routing
import { Routes, Route } from 'react-router-dom'

// toast notification
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import {useDispatch} from 'react-redux'

// custom components
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Add from './components/Add'
import Edit from './components/Edit'
import Signup from './components/Signup'
import Login from './components/Login'
import UpdateInformation from './components/UpdateInformation'
import Profile from './components/Profile'

// css
import './App.css'

function App() {
  const [loginCredential, setLoginCredential] = useState("");
  const [loginState, setLoginState] = useState("");
  const [loginShow, setLoginShow] = useState(false);
  const [profile,setProfile] = useState("");

  // profile data setup here so that after first render the data will load using useEffect and in second render after the
  // login process , the data gets in the store for the user

  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`http://localhost:3001/SignupInfo/${loginState}`)
      .then((response) => {
        setProfile(response.data)
        dispatch({ type: "FETCH_USER", payload: profile })
      })
      .catch((err) => console.log(err));
  })

  

  return (
    <div>
      <ToastContainer />
      <Navbar setLoginState={setLoginState} loginShow={loginShow} setLoginShow={setLoginShow} />
      <Routes>
        <Route exact path={`${loginShow ? '/home' : '/'}`} element={
          loginShow ? <Home loginState={loginState} /> : <LandingPage />
        } />

        <Route path='/add' element={
          <Add loginState={loginState} />
        } />

        <Route path='/edit/:id' element={
          <Edit />
        } />
        <Route path='/signup/*' element={
          <Signup />
        } />
        <Route path='/login/*' element={
          <Login setLoginState={setLoginState} setLoginShow={setLoginShow} setLoginCredential={setLoginCredential} />
        } />
        <Route path='/updateInformation/*' element={<UpdateInformation />}  />
        <Route path='/profile/*' element={<Profile loginState={loginState} />}  />
      </Routes>
    </div>
  )
}

export default App