import {toast} from 'react-toastify'
import axios from 'axios';



//Registration function
const register = (e,username,email,password,users,dispatch,navigation) => {
    const checkEmail = users.find((item) => item.email === email);
    if (!email || !password || !username) {
        return toast("Please fill all the fields");
    }
    if (checkEmail) {
        return toast.error("User exists")
    }
    else {
        const data = {
            email,
            username,
            password
        }
        dispatch({ type: "ADD_USER", payload: data })
        toast.success("Saved successfully😎");
        navigation('/login')
        e.preventDefault();
    }
}



//login method
const login = (e,email,password,loginState,setLoginState,setLoginShow,navigation,dispatch,profile,setProfile) => {
    axios.post("http://localhost:3001/LoginUser", {
        email: email,
        password: password
    })
        .then(res => {
            setLoginState(res.data[0]._id)
            if (res.data === "user not exist") {
                return toast.error("User does not exist")
            }
            else {
                setLoginShow(true);
                toast.success("Logged in successfully")
                navigation('/home')
                axios.get(`http://localhost:3001/SignupInfo/${loginState}`)
                    .then((response) => {
                        setProfile(response.data)
                        dispatch({ type: "FETCH_USER", payload: profile })
                    })
                    .catch((err) => console.log(err));
            }
        })
        .catch(err => {
            console.log(err);
        })
    e.preventDefault();
}

export {register,login}