import React, {useState, useEffect, useReducer} from 'react';
import axios from "axios";
import Post from './Post';

const PostList = () => {
    const [posts, setPosts] = useState([{}]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/posts')
            .then(res => {
                console.log(res)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            {posts.map(post => (
                <Post
                    title={post.title}
                    contents={post.contents}
                    key={post.id}
                    id={post.id}
                />
            ))}
        </>
    )
}

export default PostList;