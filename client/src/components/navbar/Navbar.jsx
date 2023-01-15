import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {

  const {darkMode, toggle} = useContext(DarkModeContext)
  const {currentUser} = useContext(AuthContext)
  
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{textDecoration:"none"}} >  
          <span>SiestaSocial</span>   
        </Link>
        <HomeOutlinedIcon/>
        {darkMode ? (<ModeNightOutlinedIcon style={{cursor:"pointer"}} onClick={toggle} />): (<WbSunnyOutlinedIcon style={{cursor:"pointer"}} onClick={toggle} />)}
        <GridViewOutlinedIcon/>
        <div className="search">
          <SearchOutlinedIcon/>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <NotificationsOutlinedIcon/>
        <EmailOutlinedIcon/>
        <PersonOutlineOutlinedIcon/>
        <div className="user">
          <img src= {"/upload/"+currentUser.profilePic} alt="" />
          <span>{currentUser.username}</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar