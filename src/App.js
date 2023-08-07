import './App.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Login from './pages/Login';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from './pages/Signup';
import Home from './pages/Home';


function App() {
  const { UserDetails } = useSelector((state) => state.UserAuth);

  return (
    <div className='bg-slate-800'>
       <Routes> 
          <Route eexat path='/' element={<Home/>} ></Route>
          <Route eexat path='/login' element={<Login/>} ></Route>
          <Route eexat path='/signup' element={<Signup/>} ></Route>
        </Routes>
    </div>
  );
}

export default App;
