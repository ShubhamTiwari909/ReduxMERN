import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

function Edit() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const { id } = useParams()

    const contacts = useSelector(state => state)

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
        <div>
            {
                currentContacts ?
                    <>
                        <h1 className="text-4xl text-center text-slate-800 font-bold">Edit Contact {currentContacts.name}</h1>
                        <div className="grid place-content-center">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Name..."
                                        value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email..."
                                        value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="number" className="form-control" placeholder="Phone..."
                                        value={number} onChange={e => setNumber(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="btn bg-dark text-white" value="Update" />
                                    <Link to='/home' className="btn btn-danger">Cancel</Link>
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