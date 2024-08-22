import React from 'react';
import PostForm from '../components/Post/PostForm';

function CreatePost() {
  return (
    <div className="create-post">
      <h1>Create a New Post</h1>
      <PostForm isEditMode={false} />
    </div>
  );
}

export default CreatePost;
