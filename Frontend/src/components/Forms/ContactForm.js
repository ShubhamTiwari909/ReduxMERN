import { Link } from 'react-router-dom'

function Form(props) {
    return (
        <div>
            <h1 className="text-4xl text-center text-slate-800 font-bold">{props.title}</h1>
            <div className="grid place-content-center my-5">
                <form onSubmit={props.handle} className="w-blue-claymorphism">
                    <div className="form-group">
                        <input type="text" className="form-control my-3" placeholder="Name..." value={props.name} onChange={e => props.setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control my-3" placeholder="Email..." value={props.email} onChange={e => props.setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control my-3" placeholder="Phone..." value={props.number} onChange={e => props.setNumber(e.target.value)} />
                    </div>
                    <div className="form-group flex my-6 space-x-4">
                        <input type="submit"
                            className="form-control bg-gradient-to-r from bg-indigo-500 via-purple-500 to-pink-500 text-white"
                            value={props.buttonText} />
                        <div>
                            <Link to='/home' className="btn btn-danger">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form