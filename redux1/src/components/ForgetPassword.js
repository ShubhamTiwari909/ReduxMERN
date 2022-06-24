import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Login from './Login'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import './component.css'

function ForgetPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:3001/SignupInfo")
      .then((response) => {
        dispatch({ type: "FETCH_USER", payload: response.data })
      })
      .catch((err) => console.log(err));
  }, [dispatch])

  const users = useSelector((state) => state.signup);

  const navigation = useNavigate();

  const hanldeUsername = (e) => {
    setUsername(e.target.value);
  };
  const hanldeEmail = (e) => {
    setEmail(e.target.value);
  };
  const hanldeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const hanldeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };


  //Registration function
  const changePassword = (e) => {
    const checkEmail = users.find((item) => item.email === email);
    if (!username || !email || !oldPassword || !newPassword) {
      return toast("Please fill all the fields");
    }
    if (checkEmail) {
      const data = {
        username,
        email,
        oldPassword,
        newPassword
      }
      axios
        .put("http://localhost:3001/UpdateUser", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      toast.success("User data updated successfully😎");
      navigation('/login')
      e.preventDefault();
    }
    else {
      return toast.error("User does not exist")
    }
  }

  return (
    <div className="py-20 bg-indigo-100 pt-10 px-4">
      <div className="w-green-claymorphism bg-white max-w-md mx-auto overflow-hidden md:max-w-md">
        <div className="md:flex">
          <div className="w-full p-3 px-6 py-10">
            <div className="mt-3 relative">
            <div className="my-7 relative">
                <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">New Username</span>
                <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                  name="email" value={email} onChange={hanldeEmail} />
              </div>
              <div className="my-7 relative">
                <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">New Username</span>
                <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                  name="text" value={username} onChange={hanldeUsername} />
              </div>
            </div>

            <div className="my-7 relative">
              <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Old Password</span>
              <input type="password" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                name="oldpassword" value={oldPassword} onChange={hanldeOldPassword} />
            </div>

            <div className="my-7 relative">
              <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">New Password</span>
              <input type="password" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                name="newpassword" value={newPassword} onChange={hanldeNewPassword} />
            </div>

            <div className="mt-4 flex justify-between">
              <button className="h-12 w-1/2 lg:w-1/4 md:1/3 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={changePassword}>Change Password</button>
              <button className="h-10 w-1/3 bg-blue-600 text-white rounded hover:bg-blue-700 hover:text-white">
                <NavLink to="/login" className="text-white">Sign in</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>

  )
}

export default ForgetPassword