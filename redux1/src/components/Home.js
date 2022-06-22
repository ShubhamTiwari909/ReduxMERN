import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FcEditImage, FcDeleteDatabase } from 'react-icons/fc'
import axios from 'axios'
import './component.css'

function Home() {
  const [data, setData] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:3001/Users")
      .then((response) => {
        setData(response.data)
        dispatch({ type: "FETCH", payload: data })
      })
      .catch((err) => console.log(err));
  }, [data, dispatch])

  const contacts = useSelector(state => state);


  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact? \n press ok to delete and press cancel to cancel the operation ")) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
      toast.success(("Contact deleted successfully"))
    }
  }

  return (
    <div className='bodyBackground'>
      <p className="my-4 text-3xl text-center">User Details</p>
      <div className="grid justify-content-center">
        <Link to='/add' className="btn btn-primary my-6 justify-self-center" >Add</Link>
        <div className="grid grid-cols-5 my-4 py-4 pl-2 bg-gradient-to-r from-black via-slate-800 to-slate-900
                rounded-lg">
          <h1>S No. </h1>
          <h1>Name</h1>
          <h1>Email</h1>
          <h1>Number</h1>
          <h1>Action</h1>
        </div>
        <div>
          {
            contacts?.map((contact, index) => {
              return (
                <div key={contact._id} className="grid grid-cols-5 gap-2 my-4 py-4 pl-2 bg-gradient-to-r from-purple-900 via-indigo-800 to-pink-900 
                rounded-lg">
                  <h1>{index + 1}.</h1>
                  <h1>{contact.name}</h1>
                  <h1 className="break-words">{contact.email}</h1>
                  <h1>{contact.number}</h1>
                  <div className="space-x-3 flex flex-col md:block lg:block">
                    <Link to={`/edit/${contact._id}`} className="btn btn-small mr-2">
                      <FcEditImage size="1.5rem" />
                    </Link>
                    <button className="btn btn-small" onClick={() => deleteContact(contact._id)}>
                      <FcDeleteDatabase size="1.5rem" />
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home