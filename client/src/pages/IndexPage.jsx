import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from 'axios';

const IndexPage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const url = `/api/post/`
        const fetchData = async () => {
            try {
                // const response = await fetch(url, {
                //     method: 'GET',
                //     headers: {"Content-Type": "application/json"},
                //     credentials: 'include'
                // })
                // if(response.ok){
                //     const data = await response.json();
                //     setPosts(data);
                // }
                const response = await axios({
                    url: url,
                    method: 'get',
                    withCredentials: true
                });
                if(response.status === 200){
                    const data = await response.data;
                    setPosts(data);
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {
                posts.map(post => <Post key={post._id} {...post}/>)
            }
        </>
    )
}

export default IndexPage;