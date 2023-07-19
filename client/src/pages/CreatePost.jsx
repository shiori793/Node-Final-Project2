import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Editor from "../components/Editor";
import axios from '../utils/axios';

const CreatePost = () => {

    const [postData, setPostData] = useState({
        title: '',
        summary: '',
        content: '',
        file: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleContent = (html) => {
        setPostData(prev => ({
            ...prev,
            content: html
        }))
    }

    const handleFile = (e) => {
        const { files } = e.target
        setPostData(prev => ({
            ...prev,
            file: files[0]
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `/api/post/create`
        const data = new FormData();
        for(const key in postData){
            data.set(key, postData[key])
        }
        try {
            // const response = await fetch(url, {
            //     method: 'POST',
            //     body: data,
            //     credentials: 'include'
            // })
            // if(response.ok){
            //     navigate("/index");
            // }
            const response = await axios.post(url, data, { withCredentials: true });
            if(response.status === 200){
                navigate("/index");
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                placeholder="Title"
                value={postData.title}
                onChange={handleChange}
                required
            />
            <input 
                type="text" 
                name="summary" 
                placeholder="Summary"
                value={postData.summary}
                onChange={handleChange}
                required
            />
            <input 
                type="file" 
                name="file"
                onChange={handleFile}
                required
            />
            <Editor 
                content={postData.content} 
                handleContent={handleContent} 
            />
            <button type='submit' style={{marginTop: '5px'}}>Create Post</button>
        </form>
    )
}

export default CreatePost;