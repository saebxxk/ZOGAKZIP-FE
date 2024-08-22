import React from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../components/Post/PostDetail';

function ViewPostDetail() {
  const { postId } = useParams();

  return (
    <div className="view-post-detail">
      <h1>Post Detail</h1>
      <PostDetail postId={postId} />
    </div>
  );
}

export default ViewPostDetail;
