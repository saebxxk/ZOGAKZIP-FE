import React, { useState } from 'react';
import { createComment } from '../../api/commentAPI';

function CommentForm({ postId }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(postId, { content })
      .then(() => {
        alert('Comment added successfully.');
        setContent(''); 
        window.location.reload(); //새로고침 후 변경사항 반영
      })
      .catch(error => {
        alert('Failed to add comment.');
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentForm;