import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import './component.css'
function Add(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const contacts = useSelector((state) => state.contact);
    const dispatch = useDispatch();

    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.email === email);

        const checkNumber = contacts.find(contact => contact.number === number);

        if (!email || !number || !name) {
            return toast("Please fill all the fields");
        }
        if (checkEmail) {
            return toast.error("This email already exists")
        }
        if (checkNumber) {
            return toast.error("This phone number already exists")
        }

        const uniqueId = props.loginState.toString();

        const data = {
            uniqueId,
            name,
            email,
            number
        }
        dispatch({ type: "ADD_CONTACT", payload: data })
        toast.success("Saved successfully😎");
        navigation('/home')
    }
    return (
        <div className="my-4">
            <h1 className="text-4xl text-center text-slate-800 font-bold">Add Contact</h1>
            <div className="grid place-content-center my-5">
                <form onSubmit={handleSubmit} className="w-blue-claymorphism">
                    <div className="form-group">
                        <input type="text" className="form-control my-3" placeholder="Name..." value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control my-3" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control my-3" placeholder="Phone..." value={number} onChange={e => setNumber(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            className="form-control my-6 bg-gradient-to-r from bg-indigo-500 via-purple-500 to-pink-500 text-white"
                            value="ADD" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Add