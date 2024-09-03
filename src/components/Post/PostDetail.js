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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  //   댓글 모달 창
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [commentPassword, setCommentPassword] = useState('');

  // 목 데이터
  const mockPost = {
    id: 1,
    image: 'https://via.placeholder.com/200',
    title: 'Test Post',
    description: 'This is a test post description.',
    location: 'Seoul',
    tags: ['travel', 'fun'],
    moment: 'A beautiful sunset',
    likeCount: 10,
    commentCount: 5,
    nickname: 'user123',
    momentDate: '2024-08-03',
  };

  useEffect(() => {

    //테스트

    setIsPublic(true);
    if (isPublic) {
      // 게시글 로드
      loadPostDetails();
    } else {
      setLoading(false); // 비공개 게시글일 경우 비밀번호 입력 대기
    }
  }, [postId, isPublic]);

  const loadPostDetails = () => {
    // 목 데이터 사용
    setPost(mockPost);
    setLoading(false);
  };

  const handleLike = () => {
    // 좋아요 클릭 시, 목 데이터의 likeCount 증가
    setPost(prevPost => ({
      ...prevPost,
      likeCount: prevPost.likeCount + 1,
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // 비밀번호 확인 로직을 단순히 통과시키기
    if (password === '1234') { // 임의의 비밀번호 설정
      loadPostDetails(); // 비밀번호가 맞으면 게시글 정보 로드
    } else {
      setError('Incorrect password.');
      setLoading(false);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleSubmitComment = () => {
    // 댓글 등록 로직 구현
    console.log('닉네임:', nickname);
    console.log('댓글:', comment);
    console.log('비밀번호:', commentPassword);
    closeCommentModal(); // 등록 후 모달 닫기
  };



    {/*}
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

  */}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-detail-container" style={{ width: '80%', margin: '0 auto', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      {/* 상단부 */}
      <div className="post-header" style={{ marginBottom : '20px'}}>
      <div className="header-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', borderBottom: '1px solid #ccc' }}>
        <div className="left-side" style={{ fontSize: '14px' }}>
          <span>{post.nickname}</span> <span>| 공개</span>
        </div>
        <div className="right-side" style={{ fontSize: '14px' }}>
          <button onClick={() => openModal('edit')} style={{ marginRight: '10px', backgroundColor: 'white', border: 'none', cursor: 'pointer' }}>추억 수정하기</button>
          <button onClick={() => openModal('delete')} style={{ backgroundColor: 'white', border: 'none', cursor: 'pointer'}}>추억 삭제하기</button>
        </div>
      </div>
        {/* 포스트 제목 및 태그 */}
      <div className="post-title" style={{ padding: '20px 10px', borderBottom: '1px solid #ccc', textAlign: 'left' }}>
          <h1 style={{ fontSize: '30px', margin: '0 0 10px 0' }}>{post.title}</h1>
          <p style={{ fontSize: '15px', margin: 0 }}>{post.tags.join(', ')}</p>
        </div>
      </div>


       {/* 정보 및 공감 버튼 박스 */}
       <div className="post-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #ccc' }}>
        <div className="info-left" style={{ display: 'flex', gap: '20px', fontSize: '14px', textAlign: 'left' }}>
          <p style={{ margin: 0 }}> {post.location}</p>
          <p style={{ margin: 0 }}> {post.momentDate}</p>
          <p style={{ margin: 0 }}>공감 수: {post.likeCount}</p>
          <p style={{ margin: 0 }}>댓글 수: {post.commentCount}</p>
        </div>
        <div className="info-right">
          <button onClick={handleLike} style={{ fontSize: '14px', padding: '10px 20px', cursor: 'pointer', borderRadius: '6px', backgroundColor: 'white' }}>공감 보내기</button>
        </div>
      </div>

      {/* 중간부 */}
      <div className="post-content" style={{ padding: '20px', borderBottom: '1px solid #ccc', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '80px' }}>
        <img src={post.image} alt={post.title} style={{ width: '200px', height: '200px' }} />
        <p style={{ fontSize: '16px', textAlign: 'center' }}>{post.description}</p>
        <button onClick={openCommentModal} style={{ fontSize: '14px', padding: '10px 20px', width: '300px', height: '40px', borderRadius:'6px', backgroundColor: 'black', color: 'white', cursor: 'pointer', marginBottom: '40px' }}>댓글 등록하기</button>

        <p style={{ fontSize: '14px', alignSelf: 'flex-start', margin: 0}}>댓글</p>
      </div>


      

       {/* 하단부 */}
       <div className="post-comments" style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '18px' }}>comments</h2>
        {/* <CommentList postId={postId} /> */}
        {/* <CommentForm postId={postId} /> */}
      </div>


      {/* 댓글 등록 모달 */}
      {isCommentModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '480px', height: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>댓글 등록</h2>
            <div className="input-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '14px', textAlign: 'left' }}>닉네임</label>
              <input 
                type="text" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
                placeholder="닉네임을 입력해 주세요"
                style={{ padding: '10px', fontSize: '14px' }} />
            </div>
            <div className="input-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '14px',textAlign: 'left' }}>댓글</label>
              <textarea value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="댓글을 입력해 주세요"
                style={{ padding: '10px', fontSize: '14px', height: '150px' }} />
            </div>
            <div className="input-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '14px', textAlign: 'left' }}>비밀번호</label>
              <input type="password" 
                value={commentPassword} 
                onChange={(e) => setCommentPassword(e.target.value)} 
                placeholder="비밀번호를 입력해 주세요"
                style={{ padding: '10px', fontSize: '14px' }} />
            </div>
            <button onClick={handleSubmitComment} style={{ width: '400px', height: '50px', backgroundColor: 'black', color: 'white', fontSize:'16px', borderRadius: '6px', padding: '10px', cursor: 'pointer', alignSelf: 'center' }}>등록하기</button>
          </div>
        </div>
      )}



      {/* 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px', textAlign: 'center' }}>
            {modalType === 'edit' ? (
              <div>
                <h2 style={{ fontSize: '16px' }}>추억 수정하기</h2>
                <p style={{ fontSize: '14px' }}>추억을 수정하시겠습니까?</p>
                {/* 여기에 수정 폼을 추가할 수 있습니다 */}
              </div>
            ) : (
              <div>
                <h2 style={{ fontSize: '16px' }}>추억 삭제하기</h2>
                <p style={{ fontSize: '14px' }}>정말로 추억을 삭제하시겠습니까?</p>
                {/* 여기에 삭제 확인 버튼을 추가할 수 있습니다 */}
              </div>
            )}
            <button onClick={closeModal} style={{ marginTop: '20px', fontSize: '14px' }}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

    

        
        
export default PostDetail;