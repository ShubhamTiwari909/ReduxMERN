import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {handleAdd} from './CRUDfunctions'
import Form from '../Forms/ContactForm'

import '../component.css'
function Add(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const contacts = useSelector((state) => state.contact);
    const dispatch = useDispatch();

    const navigation = useNavigate();

    return (
        <div className="my-4">
           
            <Form title="Add Contact" name={name} email={email} number={number} 
                  setName={setName} setEmail={setEmail} setNumber={setNumber} 
                  handle={(event) => handleAdd(event, name, email, number, props.loginState, contacts, dispatch, navigation)} 
                  />
        </div>
    )
}

export default Add