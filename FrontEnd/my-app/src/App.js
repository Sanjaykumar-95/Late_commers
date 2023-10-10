
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/Dashboard';
import MorningBatch from './Pages/MorningBatch';
import Afternoon from './Pages/AfternoonBatch';
import Present from './components/Present';
import Absent from './components/Absent';
import Trainees from './components/Trainees';
import Late from './components/Late';
import Atendance from './Pages/Attendance';
import Login from './LoginPage/Login';
import SignupForm from './sample/Signup';
import Loginform from './sample/Slogin';

const App = () => {
  return (
  
    <BrowserRouter>

        <Routes>

        <Route path="/signup" element={<SignupForm />} />
        <Route path="/Login" element={<Loginform />} />

          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path='/Atendance' element={<Atendance />} />
          <Route path='/morning' element={<MorningBatch />} />
          <Route path='/afternoon' element={<Afternoon />} />
          <Route path='/present' element={<Present />} />
          <Route path='/absent' element={<Absent />} />
          <Route path='/trainees' element={<Trainees />} />
          <Route path='/late' element={<Late />} />
          <Route path='/logout' element={<Login />} />

        </Routes>
      

    </BrowserRouter>
  
  )
};

export default App;

// import {useEffect, useState} from "react";

// const API = "https://jsonplaceholder.typicode.com/users";

// const App = () => {
//     const [users, setUsers] = useState([]);

//     const fetchUsers = async (url) => {
//         try {
//             const res = await fetch(url);
//             const data = await res.json();
//             if (data.length > 0) {
//                 setUsers(data);
//             }
//             console.log(data);
//         } catch (e) {
//             console.error(e)
//         }
//     }


//     useEffect(() => {
//         fetchUsers(API);
//     }, [])
//     return <>
//         <table>
//             <thead>
//             <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Address</th>
//             </tr>
//             </thead>
//             <tbody>
//             <UserData users={users}/>
//             </tbody>
//         </table>
//     </>
// }

// export default App;