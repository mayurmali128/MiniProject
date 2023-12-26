import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { logout } from "../loggedslice";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const dispatchRedux = useDispatch();
    let navigate = useNavigate();
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
        </div>
      </div>
    );
};

export default UserHeader;
