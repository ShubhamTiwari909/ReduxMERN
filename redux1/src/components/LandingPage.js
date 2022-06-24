import { useNavigate } from 'react-router-dom'
import './component.css'
function LandingPage() {
  const navigation = useNavigate()
  return (
    <div className="LandingPage grid">
      <button className="align-self-end justify-self-center text-white 
      bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
      focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
      font-medium rounded-lg text-sm px-5 py-3.5 text-center mr-2 mb-2"
      onClick={() => {
        navigation('/login')
      }}>Lets get started
      </button>
    </div>
  )
}

export default LandingPage