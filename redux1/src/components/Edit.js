import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import './component.css'

function Edit() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const { id } = useParams()

    const contacts = useSelector(state => state.contact)

    const currentContacts = contacts.find(contact => contact._id === id);

    const dispatch = useDispatch();

    const navigation = useNavigate();

    useEffect(() => {
        if (currentContacts) {
            setName(currentContacts.name)
            setEmail(currentContacts.email)
            setNumber(currentContacts.number)
        }
    }, [currentContacts])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !number || !name) {
            return toast("Please fill all the fields");
        }

        const data = {
            id,
            name,
            email,
            number
        }
        dispatch({ type: "UPDATE_CONTACT", payload: data })
        toast.success("student update successfully😎");
        navigation('/home')
    }

    return (
        <div className="my-4">
            {
                currentContacts ?
                    <>
                        <h1 className="text-4xl text-center text-slate-800 font-bold">Edit Contact {currentContacts.name}</h1>
                        <div className="grid place-content-center my-4">
                            <form onSubmit={handleSubmit} className="w-purple-claymorphism">
                                <div className="form-group">
                                    <input type="text" className="form-control my-3" placeholder="Name..."
                                        value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control my-3" placeholder="Email..."
                                        value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="number" className="form-control my-3" placeholder="Phone..."
                                        value={number} onChange={e => setNumber(e.target.value)} />
                                </div>
                                <div className="form-group my-6 space-x-4">
                                    <input type="submit" className="btn bg-gradient-to-r from bg-indigo-500 via-purple-500 to-pink-500 text-white" value="Update" />
                                    <Link to='/' className="btn btn-danger">Cancel</Link>
                                </div>
                            </form>
                          
                        </div>
                    </>
                    :
                    <div>
                        <h1 className="text-2xl text-red-700 font-bold text-center my-10">Student with the id: {id} does not exists</h1>
                    </div>
            }

        </div>
    )
}

export default Edit