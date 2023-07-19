import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";
import axios from 'axios';

const LoginPage = () => {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const { setUser } = useContext(UserContext);

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
        const url = `/api/auth/login`
        try {
            // const response = await fetch(url, {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Accept": "application/json"
            //     },
            //     body: JSON.stringify(userData),
            //     credentials: 'include'
            // })
            // if(response.ok){
            //     const data = await response.json();
            //     setUser({
            //         id: data.id,
            //         username: data.username,
            //         isAdmin: data.isAdmin,
            //         isLogin: true
            //     })
            //     navigate("/index");
            // }
            const response = await axios.post(url, userData, { withCredentials: true });
            if(response.status === 200){
                const data = await response.data;
                setUser({
                    id: data.id,
                    username: data.username,
                    isAdmin: data.isAdmin,
                    isLogin: true
                })
                navigate("/index");
            }
        } catch (e) {
            console.log(e)
        }
    }   

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1>Login</h1><input 
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
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginPage;