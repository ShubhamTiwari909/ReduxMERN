import Login from '../AppComponents//Login'
import { Routes, Route, NavLink } from 'react-router-dom'

function SignupForm(props) {
    return (
        <div>
            <div className="w-green-claymorphism bg-white max-w-md mx-auto overflow-hidden md:max-w-md">
                <div className="md:flex">
                    <div className="w-full p-3 px-6 py-10">

                        <div className="text-center">
                            <span className="text-xl text-gray-900">Registration Form</span>
                        </div>

                        <div className="mt-3 relative">
                            <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Full Name</span>
                            <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                                name="name" value={props.name} onChange={(e) => props.setUsername(e.target.value)} />
                        </div>


                        <div className="mt-4 relative">
                            <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Email</span>
                            <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                                name="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
                        </div>

                        <div className="my-4 relative">
                            <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Password</span>
                            <input type={props.showPassword} className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"
                                name="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)} />
                        </div>
                        <div>
                            <span><input type="checkbox" name="showPassword" onClick={props.hidePassword} /> Show Password</span>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <button className="h-12 w-1/2 lg:w-1/4 md:1/3 bg-green-600 text-white rounded hover:bg-green-700"
                                onClick={props.handleSignup}>Register</button>
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

export default SignupForm