import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Forms/LoginForm'
import {login} from '../AppComponents/HandleMethods/HandleAppComponents'
import '../component.css'

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [profile, setProfile] = useState("");
    const [showPassword, setShowPassword] = useState("password");

    const dispatch = useDispatch();

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const hidePassword = () => {
        if(showPassword === "password") {
            setShowPassword("text")
        }
        else{
            setShowPassword("password")
        }
    }
    const navigation = useNavigate();

    return (
        <div className="">
            <LoginForm email={email} password={password} handleEmail={handleEmail} handlePassword={handlePassword}
            hidePassword={hidePassword} showPassword={showPassword} 
            handleLogin={(event) => login(event,email,password,props.loginState,props.setLoginState,props.setLoginShow,navigation,dispatch,profile,setProfile)} />
        </div>
    )
}

export default Login