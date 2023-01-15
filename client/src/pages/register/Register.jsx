import "./register.scss"
import {Link} from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export const Register = () => {

  const [user, setUser ] = useState({
    username:"",
    email:"",
    password:"",
    name:""
  })
  const [error, setError] = useState(null)
  const handleInput = (e)=>{
    setUser((prev)=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/api/auth/register", user)

    }catch(err){
      console.log(err)
      setError(err.response.data)
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Siesta Social</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <span>
            Do you already have an account ? 
          </span>
          <Link to="/login" >
            <button>Login</button>
          </Link>        
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input onChange={handleInput} name="username" type="text" placeholder="Username" />
            <input onChange={handleInput} name="email" type="email" placeholder="Email" />
            <input onChange={handleInput} name="password" type="password" placeholder="Password" />
            <input onChange={handleInput} name="name" type="name" placeholder="Name" />
            <button onClick={handleSubmit} >Register</button>
            {error}
          </form>
        </div>
      </div>
    </div>
  )
}
