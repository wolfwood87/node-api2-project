import React, {useState} from 'react';
import axios from 'axios';

const Comment = props => {
    const [comment, setComment] = useState({text: props.text})
    return (
        <>
            <div>
                <p>{comment.text}</p>
            </div>
        </>
    )
}

export default Comment;