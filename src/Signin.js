import React,{useState} from 'react'
import './Signin.css'
import {Link, useNavigate} from "react-router-dom";
import { auth } from "./firebase";


function Signin() {
  const Navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const SignIn = e =>{
        e.preventDefault();

        //firebase login stuff
        auth
          .signInWithEmailAndPassword(email, password)
          .then(auth => {
            Navigate("/");
          })
          .catch((error) => alert(error.message));


    }

    const register = e=>{
        e.preventDefault();

        auth
          .createUserWithEmailAndPassword(email,password)
          .then((auth)=>{
            if(auth){
              Navigate('/')
            }
          })
          .catch(error=>alert(error.message))

    }
  return (
    <div className="Sign_in">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="signbox">
        <h1 className="signinh1">Sign-in</h1>
        <form action="" className='signinform'>
        <h5>E-mail</h5>

        <input type="text" className="signininput1" value={email} onChange={e=>setEmail(e.target.value)}/>

        <h5>Password</h5>
        <input type="password" className="signininput2" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className='signin_login' type='submit' onClick={SignIn}>sign in</button>
        </form>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          aspernatur molestiae quia in ea reiciendis harum blanditiis ipsam ut
          aperiam.
        </p>
        <button className='signcreate' onClick={register}>Create your Amazon account</button>
      </div>
    </div>
  );
}

export default Signin
