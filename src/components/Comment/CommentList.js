import React, { useEffect, useState } from 'react';
import { fetchCommentsByPostId } from '../../api/commentAPI';
import CommentItem from './CommentItem';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommentsByPostId(postId)
      .then(response => {
        setComments(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load comments.');
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;