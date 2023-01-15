import "./login.scss"
import {Link, useNavigate} from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

const Login = ()=> {
  const navigate = useNavigate()
  const {login} = useContext(AuthContext)
  const [inputLogin, setInputLogin] = useState({
    username:"",
    password:""
  })
  const [error, setError] = useState(null)
    const handleLogin = async (e) =>{
      e.preventDefault()
      try{
        await login(inputLogin)
        navigate("/")
      }catch(err){
        setError(err.response.data)
      }
    }
 
    const handleChange = (e)=>{
      setInputLogin((prev)=>{
        return {...prev, [e.target.name]: e.target.value}
      })
    }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <span>
            Don't u have an account ? 
          </span>
          <Link to="/register" >
          <button>Register</button>
          </Link>     
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input onChange={handleChange} name="username" type="text" placeholder="Username" />
            <input onChange={handleChange} name="password" type="password" placeholder="Password" />  
            <button onClick={handleLogin} type="submit">Login</button>
            {error}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login