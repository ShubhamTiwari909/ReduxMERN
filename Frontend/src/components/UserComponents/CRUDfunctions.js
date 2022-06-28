import { toast } from 'react-toastify'


//Create method
const handleAdd = (e,name,email,number,loginState,contacts,dispatch,navigation) => {
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

    const uniqueId = loginState.toString();

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



//update method
const handleUpdate = (e,id,name,email,number,dispatch,navigation) => {
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



// delete method
const handleDelete = (id,dispatch) => {
    if (window.confirm("Are you sure you want to delete this contact? \n press ok to delete and press cancel to cancel the operation ")) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
      toast.success(("Contact deleted successfully"))
    }
  }

export {handleAdd,handleUpdate,handleDelete}