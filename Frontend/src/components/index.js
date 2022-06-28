import React, { useState,useEffect } from 'react'
// Routing
import { Routes, Route } from 'react-router-dom'

// toast notification
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import {useDispatch} from 'react-redux'

// custom components
//app components
import Navbar from './AppComponents/Navbar'
import LandingPage from './AppComponents/LandingPage'
import Signup from './AppComponents/Signup'
import Login from './AppComponents/Login'
import UpdateInformation from './AppComponents/UpdateInformation'

// user components
import Home from './UserComponents/Home'
import Add from './UserComponents/Add'
import Edit from './UserComponents/Edit'
import Profile from './UserComponents/Profile'

// css
import '../App.css'

function Index() {
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
          <Login setLoginState={setLoginState} setLoginShow={setLoginShow}  />
        } />
        <Route path='/updateInformation/*' element={<UpdateInformation />}  />
        <Route path='/profile' element={<Profile loginState={loginState} />}  />
      </Routes>
    </div>
  )
}

export default Index