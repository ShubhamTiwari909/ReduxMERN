import axios from 'axios'

const contactReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH":
            state = action.payload
            return state
        case "ADD_CONTACT":
            axios
                .post("http://localhost:3001/Register", action.payload)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            return state
        case "UPDATE_CONTACT":
            axios
                .put("http://localhost:3001/update", action.payload)
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
            return state
        case "DELETE_CONTACT":
            console.log(action.payload)
            axios
                .delete(`http://localhost:3001/delete/${action.payload}`)
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
            return state
        default:
            return state;
    }
}

export default contactReducer;