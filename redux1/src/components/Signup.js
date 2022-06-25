import React, { useState, useEffect } from 'react'
import Login from './Login'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import './component.css'

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
    console.log(users);
    const navigation = useNavigate();

    const hanldeEmail = (e) => {
        setEmail(e.target.value);
    };
    const hanldeUsername = (e) => {
        setUsername(e.target.value);
    };
    const hanldePassword = (e) => {
        setPassword(e.target.value);
    };

    const hidePassword = () => {
        if (showPassword === "password") {
            setShowPassword("text")
        }
        else {
            setShowPassword("password")
        }
    }

    //Registration function
    const register = (e) => {
        const checkEmail = users.find((item) => item.email === email);
        if (!email || !password || !username) {
            return toast("Please fill all the fields");
        }
        if (checkEmail) {
            return toast.error("User exists")
        }
        else {
            const data = {
                email,
                username,
                password
            }
            dispatch({ type: "ADD_USER", payload: data })
            toast.success("Saved successfully😎");
            navigation('/login')
            e.preventDefault();
        }
    }


    return (
        <div className="py-20 bg-indigo-100 pt-10 px-4">
            <div className="w-green-claymorphism bg-white max-w-md mx-auto overflow-hidden md:max-w-md">
                <div className="md:flex">
                    <div className="w-full p-3 px-6 py-10">

                        <div className="text-center">
                            <span className="text-xl text-gray-900">Registration Form</span>
                        </div>

                        <div className="mt-3 relative">
                            <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Full Name</span>
                            <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                                name="name" value={users.name} onChange={hanldeUsername} />
                        </div>


                        <div className="mt-4 relative">
                            <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Email</span>
                            <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                                name="email" value={users.email} onChange={hanldeEmail} />
                        </div>

                        <div className="my-4 relative">
                            <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Password</span>
                            <input type={showPassword} className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                                name="password" value={users.password} onChange={hanldePassword} />
                        </div>
                        <div>
                            <span><input type="checkbox" name="showPassword" onClick={hidePassword} /> Show Password</span>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <button className="h-12 w-1/2 lg:w-1/4 md:1/3 bg-green-600 text-white rounded hover:bg-green-700"
                                onClick={register}>Register</button>
                        </div>

                        <div className="mt-10 flex">
                            <div className="mr-4">Already have an account?</div>
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

export default Signup