// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from "./componants/Main";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { LoginForm, RegistrationForm } from './componants/form';
import ProtectedRoutes from './componants/ProtectedRoutes';
import UserHome from './componants/UserHome';
import UpdatePassword from './componants/updatepassword';
function App() {
  return (
    <div className=" h-screen flex flex-col">
      <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/register' element={<RegistrationForm/>}/>
            {/* <Route element={<ProtectedRoutes/>}/>
              <Route path='/' element={<UserHome/>}/>
              <Route path='/changepass' element={<UpdatePassword/>}/>
            <Route/> */}

              <Route path='/dashboard' element={<ProtectedRoutes Component = {UserHome}/>}/>
              <Route path='/changepass'element={<ProtectedRoutes Component = {UpdatePassword}/>}/>
            {/* <Route path='/changepass' element={<UpdatePassword/>}/> */}
        </Routes>
    </div>
  );
}

export default App;
