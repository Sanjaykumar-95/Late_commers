import React, { useState, useEffect } from "react";
import { useRef } from "react";
import axios from 'axios';

const Loginform = () => {
    const id1 = useRef(null);
    const [form, SetForm] = useState('');
    const [isLoggin, SetIsLoggin] = useState(false);
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    let [data, setData] = useState([]) // let data = []
    let api = "http://localhost:8009/logins";
    useEffect(() => {
        axios.get(api).then((response) => {
            console.log(response.data)
            setData(response.data);
        });
    }, []);

    const SetLog = (name, value) => {
        data.forEach((ele) => {
            if (name === ele.username) {
                if (password === ele.password) {
                    SetIsLoggin(true);

                }
                else {
                    id1.current.style.display = 'block';
                }
            }
            else {
                id1.current.style.display = 'block';
            }
        })
    }
    if (isLoggin) {
        return (
            alert("Success....")
        )
    }


  return (
    <div>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            // value={credentials.username}
            onChange={(e) => {setName(e.target.value);}}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            // value={credentials.password}
            onChange={(e) => {setName(e.target.value);}}
          />
        </div>
        <button type="submit" onClick={() => SetLog(name,password)}>Login</button>
      </form>
    </div>
  );
};

export default Loginform;
