import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";

const Header = () => {

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        const url = `/api/auth/logout`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            })
            if(response.ok){
                setUser({
                    username: '',
                    email: '',
                    password: '',
                    isAdmin: false,
                    isLogin: false,
                    posts: []
                })
                navigate("/");
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <header>
            <Link to='/index' className="logo">{user.username && `${user.username}'s `}Blog</Link>
            <nav>
                {!user.isLogin 
                ?
                    <>
                        <Link to="/">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                :
                    <>
                        <Link to='/create'>Create new post</Link>
                        <Link onClick={handleLogout}>Logout</Link>
                    </>
                }
            </nav>
        </header>
    )
}

export default Header;