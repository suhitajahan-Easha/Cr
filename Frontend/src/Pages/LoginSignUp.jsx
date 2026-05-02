import React from 'react'

import './CSS/LoginSignUp.css'
import { useState } from 'react'

const LoginSignUp = () => {

  const [state,setState]=useState("Login");
  const [formData,setFormdata]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler=(e)=>{
    setFormdata({...formData,[e.target.name]:e.target.value})
  }

  const login=async()=>{
    console.log("login execute",formData);
    let responseData;
    await fetch('http://crimson-backend-anwo.onrender.com/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }
  const signup=async()=>{
    console.log("signup execute",formData);
    let responseData;
    await fetch('http://crimson-backend-anwo.onrender.com/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='LoginSignUp'>
       <div className="LoginSignUp-container">
        <h1>{state}</h1>
        <div className="LoginSignUp-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className='LoginSignUp-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span></p>:
        <p className='LoginSignUp-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
        <div className="LoginSignUp-agree">
          <input type="checkbox"/>
          <p>By continuing , i agree to the terms of use & privacy policy.</p>
        </div>

       </div>

      </div>
  )
}

export default LoginSignUp
