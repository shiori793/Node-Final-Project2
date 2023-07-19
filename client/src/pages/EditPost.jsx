import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import Editor from "../components/Editor";
import axios from 'axios';

const EditPost = () => {

    const {id} = useParams();

    const [postData, setPostData] = useState({
        id: '',
        title: '',
        summary: '',
        content: '',
        file: '',
        author: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const url = `/api/post/${id}`
        const fetchData = async () => {
            try {
                // const response = await fetch(url, {
                //     method: 'GET',
                //     headers: {"Content-Type": "application/json"},
                //     credentials: 'include'
                // })
                // if(response.ok){
                //     const { _id, title, summary, file, content, author } = await response.json();
                //     setPostData({
                //         id: _id,
                //         title, summary, file, content,
                //         author: author._id
                //     });
                // }
                const response = await axios.get(url, { withCredentials: true });
                if(response.status === 200){
                    const { _id, title, summary, file, content, author } = await response.data;
                    setPostData({
                        id: _id,
                        title, summary, file, content,
                        author: author._id
                    });
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, []);

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
        const url = `/api/post/update`
        const data = new FormData();
        for(const key in postData){
            data.set(key, postData[key])
        }
        try {
            // const response = await fetch(url, {
            //     method: 'PUT',
            //     body: data,
            //     credentials: 'include'
            // })
            // if(response.ok){
            //     navigate("/index");
            // }
            const response = await axios.put(url, data, { withCredentials: true });
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
            />
            <Editor 
                content={postData.content} 
                handleContent={handleContent} 
            />
            <button type='submit' style={{marginTop: '5px'}}>Edit Post</button>
        </form>
    )
}

export default EditPost;