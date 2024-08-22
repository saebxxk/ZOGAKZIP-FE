import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, likePost, verifyPostPassword, checkPostIsPublic } from '../../api/postAPI';
import CommentList from '../Comment/CommentList';
import CommentForm from '../Comment/CommentForm';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkPostIsPublic(postId)
      .then(response => {
        setIsPublic(response.data.isPublic);

        if (response.data.isPublic) {
          loadPostDetails();
        } else {
          setLoading(false); // 비공개 게시글일 경우 비밀번호 입력 대기
        }
      })
      .catch(error => {
        setError('Failed to check post visibility.');
        setLoading(false);
      });
  }, [postId]);

  const loadPostDetails = () => {
    fetchPostById(postId)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load post details.');
        setLoading(false);
      });
  };

  const handleLike = () => {
    likePost(postId)
      .then(() => {
        setPost(prevPost => ({
          ...prevPost,
          likeCount: prevPost.likeCount + 1,
        }));
      })
      .catch(error => {
        setError('Failed to like the post.');
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    verifyPostPassword(postId, password)
      .then(() => {
        loadPostDetails(); // 비밀번호가 맞으면 게시글 정보 로드
      })
      .catch(error => {
        setError('Incorrect password.');
        setLoading(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-detail">
      {isPublic || post ? (
        <>
          <img src={post.image} alt={post.title} style={{ width: '200px', height: '200px' }} />
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p>장소: {post.location}</p>
          <p>태그: {post.tags.join(', ')}</p>
          <p>추억의 순간: {post.moment}</p>
          <p>공감 수: {post.likeCount}</p>
          <p>댓글 수: {post.commentCount}</p>
          <button onClick={handleLike}>공감하기</button>

          <h2>comments</h2>
          <CommentList postId={postId} />
          <CommentForm postId={postId} />
        </>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <p>비공개 게시글입니다. 비밀번호를 입력하세요.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
          <button type="submit">확인</button>
        </form>
      )}
    </div>
  );
}

export default PostDetail;