import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './Components/PostList';
import axios from 'axios'

function App() {
  const [newPost, setNewPost] = useState({title: '', contents: ''});

  const handleChange = e => {
    e.preventDefault();
    setNewPost({
        ...newPost,
        [e.target.name]: e.target.value
    })
  }

  const submitNewPost = e => {
    e.preventDefault();
    axios
        .post(`http://localhost:4000/api/posts/`, newPost)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        })
}

  return (
    <div className="App">
      <h1>Welcome to Lord of the Social Media</h1>
      <form>
                <input
                    type='text'
                    name="title"
                    placeholder="title"
                    value={newPost.title}
                    onChange={handleChange}
                    />
                <input
                    type='text'
                    name="contents"
                    placeholder="Contents"
                    value={newPost.contents}
                    onChange={handleChange}
                    />
                <button onClick={submitNewPost}>Submit</button>
      </form>
      <PostList />
    </div>
  );
}

export default App;
