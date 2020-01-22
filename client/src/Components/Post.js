import React, {useState} from 'react';
import axios from 'axios';
import CommentList from './CommentList';

const Post = props => {
    const [post, setPost] = useState({title: props.title, contents: props.contents})
    const [form, setForm] = useState(false);

    //style
    const postStyle = {
        border: '1px solid black',
        margin: '2% auto',
        width: '70%'
    }
    const formStyle = {
        margin: '2%'
    }
    const deletePost = e => {
        e.preventDefault();
        axios
            .delete(`http://localhost:4000/api/posts/${props.id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    }
    const editPost = e => {
        e.preventDefault();
        setForm(true)
    }

    const handleChange = e => {
        e.preventDefault();
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
      }
    
      const submitEditPost = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:4000/api/posts/${props.id}`, post)
            .then(res => {
                console.log(res);
                setForm(false)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <div style={postStyle}>
                <>
                {form && <form style={formStyle}>
                <input
                    type='text'
                    name="title"
                    placeholder="title"
                    value={post.title}
                    onChange={handleChange}
                    />
                <input
                    type='text'
                    name="contents"
                    placeholder="Contents"
                    value={post.contents}
                    onChange={handleChange}
                    />
                <button onClick={submitEditPost}>Submit</button>
                </form>}
                {!form && 
                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.contents}</p>
                    </div>}
                </>
                <button onClick={editPost}>Edit</button>
                <button onClick={deletePost}>Delete</button>
                <CommentList postId={props.id}/>
            </div>
        </>
    )
}

export default Post;