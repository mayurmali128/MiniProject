import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
    return (
      <div className="flex justify-around items-center p-5 shadow-md">
        <h2 className="text-4xl font-bold text-rear " onClick={(e)=>{navigate('/')}}>MessWala</h2>
        <div className="flex space-x-5 text-xl font-normal">
          <p>About</p>
          <p>Contact</p>
          <p>FAQ</p>
          <p><Link to={'/register'} style={{ textDecoration: "none" }}>Register</Link></p>
        </div>
      </div>
    )
  }
  
  export default Header
  