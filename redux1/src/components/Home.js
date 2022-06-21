import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
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
  }, [data,dispatch])

  const contacts = useSelector(state => state);


  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    toast.success(("Contact deleted successfully"))
  }

  return (
    <div>
      <p className="my-2 text-3xl text-center">This is the home component</p>
      <div className="grid justify-content-center">
        <Link to='/' className="btn btn-primary my-6 justify-self-center" >Add</Link>
        <div className="grid grid-cols-5 my-4">
          <h1>#</h1>
          <h1>Name</h1>
          <h1>Email</h1>
          <h1>Number</h1>
          <h1>Action</h1>
        </div>
        <div>
          {
            contacts?.map((contact,index) => {
              return (
                <div key={contact._id} className="grid grid-cols-5 gap-3">
                  <h1>{index + 1}.</h1>
                  <h1>{contact.name}</h1>
                  <h1>{contact.email}</h1>
                  <h1>{contact.number}</h1>
                  <div>
                    <Link to={`/edit/${contact._id}`} className="btn btn-small btn-primary mr-2">Edit</Link>
                    <button className="btn btn-small btn-danger mr-2" onClick={() => deleteContact(contact._id)}>Delete</button>
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