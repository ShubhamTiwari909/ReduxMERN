import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { BiShowAlt } from 'react-icons/bi'
import '../component.css'
function Profile() {
  const [showPassword, setShowPassword] = useState(false)
  const isShow = () => setShowPassword(!showPassword)
  const user = useSelector(state => state.signup);


  return (
    <div className="grid place-content-center">
      <div className="w-red-claymorphism my-10 grid">
        <div>
          <h1 className="my-5"><span className="font-bold">Name -</span> {user[0].username}</h1>
          <h1 className="my-5"><span className="font-bold">Email -</span> {user[0].email}</h1>
          <div className="flex justify-between my-5">
            <h1><span className="font-bold">Password -</span> <span className={`bg-slate-700 px-3 py-1 rounded-lg ${showPassword ? "text-white" : "text-slate-700"}`}>{user[0].password}</span></h1>
            <button className="" onClick={isShow}>
              <BiShowAlt size="1.5rem" />
            </button>
          </div>
        </div>
        <button className="btn btn-primary my-10 place-self-center">
          <NavLink to='/updateInformation' className="text-white hover:text-slate-200">Update Information</NavLink>
        </button>
      </div>
    </div>
  )
}

export default Profile