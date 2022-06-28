import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import signupReducer from "./signupReducer";

const rootReducer = combineReducers({ contact: contactReducer, signup: signupReducer })

export default rootReducer