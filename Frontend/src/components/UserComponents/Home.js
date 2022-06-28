import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FcEditImage, FcDeleteDatabase } from 'react-icons/fc'
import axios from 'axios'
import {handleDelete} from './CRUDfunctions'
import '../component.css'

function Home(props) {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchNumber, setSearchNumber] = useState("");

  const dispatch = useDispatch();
  
  const contacts = useSelector(state => state.contact);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/Users/${props.loginState}`)
      .then((response) => {
        setData(response.data)
        dispatch({ type: "FETCH", payload: data })
      })
      .catch((err) => console.log(err));
  }, [data, dispatch,props.loginState])



  return (
    <div className='bodyBackground'>
      <div className='grid grid-cols-2 gap-5 justify-center my-5 space-y-3'>
        <div className="grid place-content-center">
          <label className='text-white bg-black px-4 py-1 rounded'>Search by Name</label>
          <input type="text" className="searchInput text-green-300 font-bold" value={searchName} onChange={e => setSearchName(e.target.value)} />
        </div>
        <div className="grid place-content-center">
          <label className='text-white bg-black px-4 py-1 rounded'>Search by Number</label>
          <input type="number" className="searchInput text-indigo-500 font-bold" value={searchNumber} onChange={e => setSearchNumber(e.target.value)} />
        </div>
      </div>
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
            contacts?.filter(function (contact) {
              if (searchName === "" && searchNumber === "") {
                return contact
              }
              else if (contact.name.includes(searchName) && searchNumber === "") {
                return contact.name.includes(searchName)
              }
              else {
                return contact.number.includes(parseInt(searchNumber));
              }
            }).map((contact, index) => {
              return (
                <div key={contact._id} className="grid grid-cols-5 gap-2 my-4 py-4 pl-2 bg-gradient-to-r from-purple-900 via-indigo-800 to-pink-900 
                rounded-lg">
                  <h1>{index + 1}.</h1>
                  <h1 className="capitalize">{contact.name}</h1>
                  <h1 className="break-words">{contact.email}</h1>
                  <h1>{contact.number}</h1>
                  <div className="space-x-3 flex flex-col md:block lg:block">
                    <Link to={`/edit/${contact._id}`} className="btn btn-small mr-2">
                      <FcEditImage size="1.5rem" />
                    </Link>
                    <button className="btn btn-small" onClick={() => handleDelete(contact._id,dispatch)}>
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