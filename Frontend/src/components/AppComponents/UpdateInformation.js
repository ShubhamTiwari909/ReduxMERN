import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import UpdateUserForm from '../Forms/UpdateUserForm'
import '../component.css'

function ForgetPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
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

  const hidePassword = () => {
    if(showPassword === "password") {
      setShowPassword("text")
    }
    else{
      setShowPassword("password")
    }
  }


  //Registration function
  const updateInfo = (e) => {
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
          console.log("updated user successfully");
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
      <UpdateUserForm username={username} email={email} oldPassword={oldPassword} newPassword={newPassword}
      setUsername={setUsername} setEmail={setEmail} setOldPassword={setOldPassword} setNewPassword={setNewPassword}
      showPassword={showPassword} hidePassword={hidePassword} updateInfo={updateInfo}

       />
    </div>

  )
}

export default ForgetPassword