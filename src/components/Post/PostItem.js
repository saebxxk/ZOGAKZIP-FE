import React from 'react';
import { Link } from 'react-router-dom';

function PostItem({ post }) {
  return (
    <div className="post-item">
      <img src={post.image} alt={post.title} style={{ width: '100px', height: '100px' }} />
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>장소: {post.location}</p>
      <p>태그: {post.tags.join(', ')}</p>
      <p>공감 수: {post.likeCount}</p>
      <p>댓글 수: {post.commentCount}</p>
      <Link to={`/view-post-detail/${post.id}`}>상세 보기</Link>
    </div>
  );
}

export default PostItem;