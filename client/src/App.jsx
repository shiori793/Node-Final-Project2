import './App.css';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserContext from "./context/UserContext";
import { useState } from 'react';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

function App() {

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    isLogin: false,
    posts: []
});

  const ProtectedRoute = ({ user, redirectPath = '/' }) => {
    if (!user.isLogin) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path={'/index'} element={<IndexPage />}/>
            <Route path={'/create'} element={<CreatePost />}/>
            <Route path={'/post/:id'} element={<PostPage />}/>
            <Route path={'/edit/:id'} element={<EditPost />}/>
          </Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
