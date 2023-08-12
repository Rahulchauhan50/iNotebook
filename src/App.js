import React,{ useEffect } from 'react'
import './App.css';
import Login from './pages/Login';
import { Routes, Route} from "react-router-dom";
import { setUserDetails } from './redux/features/User';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useNavigate } from 'react-router-dom'
import { useUserAuthenticationMutation } from './redux/services/UserAuth';
import { useDispatch } from 'react-redux';
import Profile from './pages/Profile';

function App() {
  const dispatch = useDispatch();
  const [IsUser] = useUserAuthenticationMutation();
  const navigate = useNavigate();


  useEffect(() => {
    AuthUser()
    // eslint-disable-next-line
  },[]);

  const AuthUser = async () => {
    IsUser()
    .unwrap()
    .then((data) => {
      dispatch(setUserDetails({user:data}))
      if(data!==null){
        navigate(`/${localStorage.getItem('folder')}/${localStorage.getItem('note')}`)
      }
    })
    .catch((error) => {
      console.error('Error Authenicationg user', error);
      console.log(error)
      navigate('/login')
    });
  } 

  return (
    <div className='bg-slate-800'>
       <Routes> 
          <Route eexat path='/' element={<Home/>} ></Route>
          <Route eexat path='/profile' element={<Profile/>} ></Route>
          <Route eexat path='/:folder' element={<Home/>} ></Route>
          <Route eexat path='/:folder/:note' element={<Home/>} ></Route>
          <Route eexat path='/login' element={<Login/>} ></Route>
          <Route eexat path='/signup' element={<Signup/>} ></Route>
        </Routes>
    </div>
  );
}

export default App;
