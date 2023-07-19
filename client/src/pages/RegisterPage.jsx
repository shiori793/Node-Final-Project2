import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const RegisterPage = () => {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `/api/auth/register`
        try {
            // const response = await fetch(url, {
            //     method: 'POST',
            //     headers: {"Content-Type": "application/json"},
            //     body: JSON.stringify(userData),
            // })
            // if(response.ok){
            //     navigate("/");
            // }
            const response = await axios.post(url, userData);
            if(response.status === 200){
                navigate("/");
            }
        } catch (e) {
            console.log(e)
        }
    }    

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input 
                type="text" 
                name="username"
                placeholder="username"
                value={userData.username}
                onChange={handleChange}
                required
            />
            <input 
                type="text" 
                name="email" 
                placeholder="email"
                value={userData.email}
                onChange={handleChange}
                required
            />
            <input 
                type="password" 
                name="password" 
                placeholder="password"
                value={userData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterPage;