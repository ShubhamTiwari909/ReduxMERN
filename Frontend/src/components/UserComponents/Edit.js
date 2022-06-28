import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleUpdate } from './CRUDfunctions'
import Form from '../Forms/ContactForm'
import '../component.css'

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


    return (
        <div className="my-4">
            {
                currentContacts ?
                    <>
                        <Form title="Update Contact" buttonText="Update" name={name} email={email} number={number}
                            setName={setName} setEmail={setEmail} setNumber={setNumber} 
                            handle={(event) => handleUpdate(event,id, name, email, number, dispatch, navigation)} 
                             />
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