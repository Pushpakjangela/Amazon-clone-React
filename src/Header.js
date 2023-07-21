import React from "react";
import img1 from "./image/logofa.png";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import LocalMall from "@mui/icons-material/LocalMall";
import { Link} from "react-router-dom"
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";






export default function Header() {

  const [{basket,user},dispatch]=useStateValue();
  const handleAuth=()=>{
    if(user){
      auth.signOut();
    }
  }


  return (
    <div className="header">
      <div className="amazonlogo">
      
      <Link to="/">
        <img src={img1} alt="imaglogo" />
      </Link>

      </div>
      <div className="search">
        <input type="text" />
        <div className="input_logo">
          <SearchIcon className="input_icon" />
        </div>
      </div>
      <div className="signin" onClick={handleAuth}>
        <span className="spanclass1">Hello {!user ? 'Guest' : user.email}</span>
        <Link to={!user && '/Signin'}>
          <span className="spanclasstext1">{user ? 'Sign Out' : 'Sign-In'}</span>
        </Link>
      </div>
      <div className="orders">
        <span className="spanclass2">Feature</span> <span className="spanclasstext2">& Orders</span>
      </div>
      <div className="prime">
        <div className="primelogo">
          <span className="spanclass3" >Your</span> <span className="spanclasstext3">Prime</span>
        </div>
        <div className="storelogo">
          <Link to="/checkout">
            <LocalMall className="store_icon" /> 
          </Link>
          <span className="chartcount">{basket?.length}</span>
        </div>
      </div>
    </div>
  );
}
