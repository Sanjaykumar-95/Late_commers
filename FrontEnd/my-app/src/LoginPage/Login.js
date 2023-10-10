import React, { useState, useEffect } from "react";
import './Login.css'; 
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import DashBoard from "../Pages/Dashboard";
function Signin() {
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
            <DashBoard />
        )
    }
    return (
        <>
            <div className="lgin" style={{color:"white"}}>
                <div className="row">
                    <div className="col-md-3 name">

                    </div>
                    <div className="col-md-9"></div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 lgn">
                        <div className="sbox">
                            <h2 style={{ textAlign: "center", width: "100%" }}>Log In</h2>
                            <br />
                            <Form>
                                <Form.Group controlId="form.UserName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" onChange={(e) => { setName(e.target.value);}} />
                                </Form.Group>

                                <Form.Group controlId="form.Pass">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="********" name="password" onChange={(e) => { setPassword(e.target.value); }} />
                                </Form.Group>
                                <br />
                                <h6 style={{ color: 'red', display: 'none' }} ref={id1} >Invalid Details</h6>
                                <br />
                                <center><Button onClick={() => SetLog(name, password)} className="bgp">Log in</Button></center>
                            </Form>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}
export default Signin;