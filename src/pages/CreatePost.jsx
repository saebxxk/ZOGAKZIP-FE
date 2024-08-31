import React from 'react';
import PostForm from '../components/Post/PostForm';

function CreatePost() {
  return (
    <div className="create-post">
      
      <PostForm isEditMode={false} />
    </div>
  );
}

export default CreatePost;
