import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import SignupForm  from '../Forms/SignupForm'
import {register} from '../AppComponents/HandleMethods/HandleAppComponents'
import '../component.css'

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
        if (showPassword === "password") {
            setShowPassword("text")
        }
        else {
            setShowPassword("password")
        }
    }



    return (
        <div className="py-20 bg-indigo-100 pt-10 px-4">
            <SignupForm name={username} email={email} password={password} showPassword={showPassword} 
            setUsername={setUsername} setEmail={setEmail} setPassword={setPassword}
            hidePassword={hidePassword} 
            handleSignup={(event) => register(event,username,email,password,users,dispatch,navigation)}/>
        </div>

    )
}

export default Signup