import React, {useState, useEffect, useReducer} from 'react';
import axios from "axios";
import Post from './Post';
import Comment from './Comment';

const CommentList = (props) => {
    const [comments, setComments] = useState([{}]);
    const [list, setList] = useState(false);
    const [newComment, setNewComment] = useState({text: ''})

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/posts/${props.postId}/comments`)
            .then(res => {
                console.log(res)
                setComments(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const openList = () => {
        setList(!list)
    }

    const handleChange = e => {
        e.preventDefault();
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value
        })
    }
    const submitChange = e => {
        e.preventDefault();

            axios
            .post(`http://localhost:4000/api/posts/${props.postId}/comments`, newComment)
            .then(res => {
                console.log(res)
                setComments([...comments, res.data])
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <> 
            {list &&
            <div>
            {comments.map(comment => (
                <Comment
                    text={comment.text}
                    key={comment.id}
                    id={comment.id}
                />
                
            ))}
            <form onSubmit={submitChange}>
                    <input
                        type="text"
                        name="text"
                        placeholder="Add a comment"
                        value={newComment.text}
                        onChange={handleChange}
                        />
                        <button>Add Comment</button>
            </form>
            </div>}
            <p onClick={openList}>&#709;</p>
        </>
    )
}

export default CommentList;