import React from 'react'
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
function Profile(props) {


  const user = useSelector(state => state.signup);

  return (
    <div>
      <div className="grid m-10">
        <h1>Name - {user[0].username}</h1>
        <h1>Email - {user[0].email}</h1>
        <div className="flex justify-between">
          <h1>Password - {user[0].password}</h1>
          <button className="btn btn-primary">
            <NavLink to='/forgetPassword' className="text-white-500">Update Information</NavLink>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile