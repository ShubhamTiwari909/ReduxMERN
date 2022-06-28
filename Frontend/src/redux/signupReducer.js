import axios from 'axios'

const contactReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_USER":
            state = action.payload
            return state
        case "ADD_USER":
            axios
                .post("http://localhost:3001/RegisterUser", action.payload)
                .then((res) => console.log(""))
                .catch((err) => console.log(err));
            return state
        default:
            return state;
    }
}

export default contactReducer;