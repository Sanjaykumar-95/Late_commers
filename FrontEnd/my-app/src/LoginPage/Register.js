import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    // const [pass, setPass] = useState('');
    // const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Confirmation Mail</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="xxxxxxxxemail.com" id="email" name="email" />
            
            {/* <label htmlFor="password"></label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" /> */}
            
            <button className="link-btn" onClick={() => props.onFormSwitch('confirmpass')}>Confirm Mail</button>

        </form>
        
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}
    
    </div>
    )
}

export default Register;