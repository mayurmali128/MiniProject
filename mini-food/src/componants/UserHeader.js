import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { logout, setUsername } from "../loggedslice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"

const UserHeader = () => {
  const dispatchRedux = useDispatch();
    let navigate = useNavigate();
    const myusername = useSelector(state=>state.logged);
    console.log("Username: "+ myusername.value+ " -->"+ myusername.username)
    return (
      <div className="flex justify-around items-center p-5 shadow-md">
        <h2 className="text-4xl font-bold text-rear ">MessWala</h2>
        <div className="flex space-x-5 text-xl font-normal">
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/changepass" style={{ textDecoration: "none" }}>
            UpdatePassword
          </Link>
          <Link onClick={(e)=>{
             e.preventDefault();
             dispatchRedux(logout());
             navigate('/login');
          }}style={{ textDecoration: "none" }} >Log Out</Link>

          <p style={{color:"pink"}}>Hello! {localStorage.getItem('user')}</p>
        </div>
      </div>
    );
};

export default UserHeader;
