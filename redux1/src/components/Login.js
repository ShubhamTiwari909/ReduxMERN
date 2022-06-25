import React, { useState } from 'react';
import axios from 'axios';
import Signup from './Signup';
import { useDispatch } from 'react-redux';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './component.css'

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

    const login = (e) => {
        axios.post("http://localhost:3001/LoginUser", {
            email: email,
            password: password
        })
            .then(res => {
                props.setLoginState(res.data[0]._id)
                if (res.data === "user not exist") {
                    return toast.error("User does not exist")
                }
                else {
                    props.setLoginShow(true);
                    toast.success("Logged in successfully")
                    navigation('/home')
                    axios.get(`http://localhost:3001/SignupInfo/${props.loginState}`)
                        .then((response) => {
                            setProfile(response.data)
                            dispatch({ type: "FETCH_USER", payload: profile })
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch(err => {
                console.log(err);
            })
        e.preventDefault();
    }

    return (
        <div className="">
            <div className="h-screen bg-indigo-100 flex justify-center items-center">
                <form className="w-blue-claymorphism w-full max-w-xs flex flex-col py-5 px-8" action="">
                    <label className="text-gray-700 font-bold py-2" htmlFor="">Email</label>
                    <input className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                        type="email" placeholder="Email" value={email} onChange={handleEmail} />
                    <label className="text-gray-700 font-bold py-2" htmlFor="">Password</label>
                    <input className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
                        type={showPassword} placeholder="********" value={password} onChange={handlePassword} />
                    <div>
                        <span><input type="checkbox" name="showPassword" onClick={hidePassword} /> Show Password</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 place-content-between my-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-1 px-4 place-self-end" onClick={login}>
                            Sign In
                        </button>
                        <div className="text-sm text-blue-600 hover:text-blue-800 font-bold place-self-end">
                            <NavLink to='/updateInformation' className="text-indigo-500">Forgot Password ?</NavLink>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 place-content-between my-4">
                        <div className="text-slate-600 hover:text-blue-800 font-bold" >
                            Dont have an Account?
                        </div>
                        <div className="place-self-end">
                            <button className="bg-green-500 hover:bg-slate-700 text-white font-bold rounded py-1 px-3">
                                <NavLink to="/signup" className="text-white">Sign Up</NavLink>
                            </button>
                        </div>
                    </div>
                </form>
            </div>



            <div>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </div>
    )
}

export default Login