import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
function Navbar(props) {

  const navigation = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-4">
        <div className="container-fluid">
          <p className="navbar-brand" href="#">E-Contact</p>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={`${props.loginShow ? "/home" : "/"}`} className="nav-link active" aria-current="page">Home</Link>
              </li>
            </ul>
            <form className="d-flex space-x-4">
              <button className={`btn px-4 border-2 border-green-400  ${props.loginShow ? "hidden" : "block"}`} type="submit">
                <Link to='/signup' className="text-white" href="#">Signup</Link>
              </button>
              <button className={`btn px-4 border-2 border-blue-400 ${props.loginShow ? "hidden" : "block"}`} type="submit">
                <Link to='/login' className="text-white" href="#">Login</Link>
              </button>
              <button className={`btn px-4 border-2 border-blue-400 ${props.loginShow ?  "block" : "hidden"}`} type="submit">
                <Link to='/profile' className="text-white" href="#">Profile</Link>
              </button>
              <button className={`btn px-4 border-2 border-blue-400 text-white ${props.loginShow ? "block" : "hidden" }`}
                onClick={() => {
                  props.setLoginState("")
                  props.setLoginShow(false)
                  navigation('/')
                  toast.warning("Logged out")
                }}>Logout</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar