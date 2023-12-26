import { useNavigate } from "react-router-dom"
import Header from "./Header"

const Main = () => {
  
  const navigate = useNavigate()

  const handler = () => {
    navigate("/login")
  }
  
  return (
    <section className="flex-1">
      <Header />;
      <div className="flex flex-col items-center mt-5 space-y-4">
        <h3 className="font-semibold text-4xl">
          Welcome to our Tiffin Web App
        </h3>
        <p className="font-medium text-xl">
          Order delicious and home made meals online
        </p>
        <img src="/Main.svg" alt="mainImage" className="h-[400px] w-[400px]" />
        <button
          onClick={handler}
          className="text-white-100 px-4 py-2  border border-rear rounded-md hover:bg-rear hover:text-primary"
        >
          Login
        </button>
      </div>
    </section>
  );
}

export default Main
