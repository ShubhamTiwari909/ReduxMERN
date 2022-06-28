import React from 'react'
import Signup from '../AppComponents/Signup';
import { Routes, Route, NavLink } from 'react-router-dom';

function LoginForm(props) {
    return (
        <div>
            <div className="h-screen bg-indigo-100 flex justify-center items-center">
                <form className="w-blue-claymorphism w-full max-w-xs flex flex-col py-5 px-8" action="">
                    <label className="text-gray-700 font-bold py-2" htmlFor="">Email</label>
                    <input className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                        type="email" placeholder="Email" value={props.email} onChange={props.handleEmail} />
                    <label className="text-gray-700 font-bold py-2" htmlFor="">Password</label>
                    <input className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
                        type={props.showPassword} placeholder="********" value={props.password} onChange={props.handlePassword} />
                    <div>
                        <span><input type="checkbox" name="showPassword" onClick={props.hidePassword} /> Show Password</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 place-content-between my-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-1 px-4 place-self-end" onClick={props.handleLogin}>
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

export default LoginForm