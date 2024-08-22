import React, { useState } from 'react';
import { deleteComment, updateComment } from '../../api/commentAPI';

function CommentItem({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleDelete = () => {
    deleteComment(comment.id)
      .then(() => {
        alert('Comment deleted successfully.');
        window.location.reload(); // 페이지를 새로고침하여 변경사항 반영
      })
      .catch(error => {
        alert('Failed to delete comment.');
        console.error(error);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateComment(comment.id, { content: editedContent })
      .then(() => {
        alert('Comment updated successfully.');
        setIsEditing(false);
        window.location.reload();
      })
      .catch(error => {
        alert('Failed to update comment.');
        console.error(error);
      });
  };

  return (
    <div className="comment-item">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>{comment.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default CommentItem;