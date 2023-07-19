import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const url = `/api/post/`
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {"Content-Type": "application/json"},
                    credentials: 'include'
                })
                if(response.ok){
                    const data = await response.json();
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