import React from 'react'
// Routing
import { Routes, Route, useNavigate } from 'react-router-dom'

// toast notification
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// custom components
import Navbar from './components/Navbar'
import Home from './components/Home'
import Add from './components/Add'
import Edit from './components/Edit'

// css
import './App.css'

function App() {
  const navigation = useNavigate();

  window.addEventListener("beforeunload", function () {
    navigation.push('/')
  })
  window.removeEventListener("beforeunload", function () {
    navigation.push('/')
  })

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path='/' element={
          <Home />
        } />

        <Route path='/add' element={
          <Add />
        } />

        <Route path='/edit/:id' element={
          <Edit />
        } />
      </Routes>
    </div>
  )
}

export default App