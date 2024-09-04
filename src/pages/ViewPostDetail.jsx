import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, likePost, verifyPostPassword, checkPostIsPublic } from '../api/postAPI';
import CommentList from '../components/Comment/CommentList';
import CommentForm from '../components/Comment/CommentForm';
import editIcon from '../assets/icons/icon=edit.svg';
import deleteIcon from '../assets/icons/icon=delete.svg';
import closeIcon from '../assets/icons/icon=x.svg';

function ViewPostDetail() {
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 댓글 수정 모달 상태 추가
  const [currentComment, setCurrentComment] = useState(null); // 수정할 댓글 데이터 저장
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달 상태 추가
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [commentPassword, setCommentPassword] = useState('');


  //추억 수정 모달
  const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false); // 수정 모달 상태
  const [title, setTitle] = useState(''); // 제목 상태
  const [imageName, setImageName] = useState(''); // 이미지 파일 이름 상태
  const [content, setContent] = useState(''); // 본문 상태
  const [tagInput, setTagInput] = useState(''); // 태그 입력 상태
  const [tags, setTags] = useState([]); // 태그 목록 상태
  const [location, setLocation] = useState(''); // 장소 상태
  const [momentDate, setMomentDate] = useState(''); // 추억의 순간 날짜 상태

  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  

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

  //댓글 목 데이터
  const mockComments = [
    {
      id: 1,
      nickname: 'user456',
      content: '정말 아름다운 순간이에요! 공유해 주셔서 감사합니다.',
      timestamp: '2024-08-03 14:35',
    },
    {
      id: 2,
      nickname: 'travel_guru',
      content: '저도 이곳을 정말 좋아해요! 좋은 게시물입니다!',
      timestamp: '2024-08-03 15:20',
    },
    {
      id: 3,
      nickname: 'sunset_lover',
      content: '일몰은 정말 최고죠, 이 사진 속 일몰은 더욱 멋지네요!',
      timestamp: '2024-08-03 16:45',
    },
    {
      id: 4,
      nickname: 'anonymous',
      content: '이곳은 사람이 많이 붐비나요? 곧 방문할 예정입니다.',
      timestamp: '2024-08-03 17:30',
    },
    {
      id: 5,
      nickname: 'user789',
      content: '이 사진에서 평온함이 느껴지네요.',
      timestamp: '2024-08-03 18:05',
    },
  ];

  // 수정 모달을 여는 함수
  const openPostEditModal = () => {
    setIsPostEditModalOpen(true);
  };

  // 수정 모달을 닫는 함수
  const closePostEditModal = () => {
    setIsPostEditModalOpen(false);
  };
  

  // 수정 제출 핸들러
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // 제출 처리 로직 추가
    console.log('수정 제출:', { title, imageName, content, tags, location, momentDate, isPublic });
  };

   // 모달 열기/닫기 함수
   const openPostDeleteModal = () => {
    setIsPostDeleteModalOpen(true);
  };

  const closePostDeleteModal = () => {
    setIsPostDeleteModalOpen(false);
  };

  const handleDeletePost = () => {
    // 추억 삭제 로직 추가
    console.log('삭제 비밀번호:', deletePassword);
    // 비밀번호 확인 후 추억 삭제 처리
    closeDeleteModal(); // 삭제 완료 후 모달 닫기
  };

  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
    }
  };

  // 태그 추가 핸들러
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim() !== '') {
        setTags((prevTags) => [...prevTags, tagInput]);
        setTagInput(''); // 입력 필드 비우기
      }
    }
  };

  // 태그 삭제 핸들러
  const handleTagDelete = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  // 공개 여부 토글 핸들러
  const handleToggleChange = () => {
    setIsPublic((prevIsPublic) => !prevIsPublic);
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

  const openEditModal = (comment) => {
    setCurrentComment(comment);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentComment(null);
  };

  const openDeleteModal = (comment) => {
    setCurrentComment(comment);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentComment(null);
  };

  const handleSubmitComment = () => {
    // 댓글 등록 로직 구현
    closeCommentModal(); // 등록 후 모달 닫기
  };

  const handleEditComment = () => {
    // 댓글 수정 로직
    closeEditModal(); // 수정 후 모달 닫기
  };

  const handleDeleteComment = () => {
    // 댓글 삭제 로직
    closeDeleteModal(); // 삭제 후 모달 닫기
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
          <button onClick= {openPostEditModal} style={{ marginRight: '10px', backgroundColor: 'white', border: 'none', cursor: 'pointer' }}>추억 수정하기</button>
          <button onClick= {openPostDeleteModal} style={{ backgroundColor: 'white', border: 'none', cursor: 'pointer'}}>추억 삭제하기</button>
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

        <p style={{ fontSize: '14px', alignSelf: 'flex-start', margin: 0}}>댓글 {post.commentCount}</p>
      </div>


      

       {/* 하단부 */}
       <div className="post-comments" style={{ padding: '10px' }}>
        
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        {mockComments.map(comment => (
          <li key={comment.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '14px', marginBottom: '5px' }}>
                <strong>{comment.nickname}</strong>
                <span style={{ fontSize: '12px', color: '#999', marginLeft: '10px' }}>{comment.timestamp}</span>
              </p>
              <p style={{ fontSize: '14px', margin: 0 }}>{comment.content}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => openEditModal(comment)} style={{ backgroundColor: 'white', border: 'none', cursor: 'pointer', padding: 0 }}>
                <img src={editIcon} alt="Edit" style={{ width: '16px', height: '16px' }} />
              </button>
              <button onClick={() => openDeleteModal(comment)} style={{ backgroundColor: 'white', border: 'none', cursor: 'pointer', padding: 0 }}>
                <img src={deleteIcon} alt="Delete" style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </li>
        ))}
      </ul>



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
        {/* 댓글 수정 모달 */}
{isEditModalOpen && (
  <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="modal-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '480px', height: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <h2 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>댓글 수정</h2>
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
      <button onClick={handleEditComment} style={{ width: '400px', height: '50px', backgroundColor: 'black', color: 'white', fontSize:'16px', borderRadius: '6px', padding: '10px', cursor: 'pointer', alignSelf: 'center' }}>수정하기</button>
    </div>
  </div>
)}


      {/* 댓글 삭제 모달 */}
      {isDeleteModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '450px', height: '335px', position: 'relative' }}>
            <img src={closeIcon} alt="Close" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', width: '16px', height: '16px' }} onClick={closeDeleteModal} />
            <h2 style={{ fontSize: '20px', textAlign: 'center', marginBottom: '40px' }}>댓글 삭제</h2>
            <p style={{ fontSize: '16px', textAlign: 'left', marginBottom: '15px' }}>삭제 권한 인증</p>
            <div className="input-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="password" 
                value={commentPassword} 
                onChange={(e) => setCommentPassword(e.target.value)} 
                placeholder="비밀번호를 입력해 주세요"
                style={{ padding: '10px', fontSize: '14px', marginBottom: '50px'}} />
            </div>
            <button onClick={handleDeleteComment} style={{ width: '100%', height: '50px', backgroundColor: 'black', color: 'white', fontSize:'16px', borderRadius: '6px', cursor: 'pointer' }}>삭제하기</button>
          </div>
        </div>
      )}


      
      {/* 추억 수정 모달 */}
      {isPostEditModalOpen && (
        <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000',
        }}
      >
        <div className="create-memory" style={{ padding: '20px', maxWidth: '1050px', margin: '0 auto', boxSizing: 'border-box', backgroundColor: 'white', borderRadius: '8px' }}>
          <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>추억 수정하기</h1>
          
          {/* 폼 태그로 감싸기 */}
          <form onSubmit={handleEditSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <img src={closeIcon} alt="Close" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', width: '16px', height: '16px' }} onClick={closePostEditModal} />
              {/* 왼쪽 섹션 */}
              <div style={{ flex: 1, minWidth: '500px', maxWidth: 'calc(50% - 20px)', padding: '20px', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', textAlign: 'left' }}>닉네임</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임을 입력하세요"
                    required
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  />
                </div>
      
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', textAlign: 'left' }}>제목</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                    required
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  />
                </div>
      
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', textAlign: 'left' }}>이미지</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={imageName}
                      placeholder="파일을 선택해 주세요"
                      readOnly
                      style={{ flex: 3, padding: '8px', boxSizing: 'border-box', marginRight: '15px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <label
                        htmlFor="file-upload"
                        style={{
                          display: 'inline-block',
                          padding: '8px 12px',
                          backgroundColor: 'black',
                          color: 'white',
                          textAlign: 'center',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          width: '100%',
                          boxSizing: 'border-box',
                        }}
                      >
                        파일 선택
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                </div>
      
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', textAlign: 'left' }}>본문</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="본문을 입력하세요"
                    required
                    style={{ width: '100%', height: '120px', padding: '8px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
      
              {/* 세로선 */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '1px',
                height: '100%',
                backgroundColor: 'black',
                opacity: 0.5,
                zIndex: 1
              }}></div>
      
              {/* 오른쪽 섹션 */}
              <div style={{ flex: 1, minWidth: '500px', maxWidth: 'calc(50% - 20px)', padding: '20px', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', textAlign: 'left' }}>태그</label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="태그를 입력하고 Enter를 누르세요"
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  />
                  <div style={{ marginTop: '10px' }}>
                    {tags.map((tag, index) => (
                      <span 
                        key={index} 
                        style={{ 
                          display: 'inline-block',
                          color: 'gray', 
                          backgroundColor: 'transparent', 
                          borderRadius: '4px', 
                          padding: '5px 10px', 
                          marginRight: '5px', 
                          marginBottom: '5px' 
                        }}
                      >
                        {tag} 
                        <span 
                          style={{ 
                            cursor: 'pointer', 
                            color: 'gray',
                            marginLeft: '5px' 
                          }} 
                          onClick={() => handleTagDelete(index)}
                        >
                          x
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
      
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', textAlign: 'left' }}>장소</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="장소를 입력하세요"
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  />
                </div>
      
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', textAlign: 'left' }}>추억의 순간</label>
                  <input
                    type="date"
                    value={momentDate}
                    onChange={(e) => setMomentDate(e.target.value)}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  />
                </div>
                
                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                  <span style={{ marginBottom: '10px', fontSize: '18px', color: 'black', textAlign: 'left', width: '100%' }}>
                      공개 여부 선택
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ 
                          marginRight: '15px', 
                          color: isPublic ? 'black' : 'gray', 
                          fontSize: '18px', 
                          textAlign: 'left', 
                          paddingRight: '10px', 
                          width: '60px',
                          display: 'inline-block'
                      }}>
                          {isPublic ? '공개' : '비공개'}
                      </span>
                      <label
                          style={{
                              position: 'relative',
                              width: '60px',
                              height: '30px',
                              display: 'inline-block',
                              cursor: 'pointer'
                          }}
                      >
                          <input
                              type="checkbox"
                              checked={isPublic}
                              onChange={handleToggleChange}
                              style={{
                                  opacity: 0,
                                  width: '100%',
                                  height: '100%',
                                  margin: 0,
                                  position: 'absolute'
                              }}
                          />
                          <span
                              style={{
                                  position: 'absolute',
                                  cursor: 'pointer',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: isPublic ? 'black' : 'gray',
                                  borderRadius: '30px',
                                  transition: '0.4s'
                              }}
                          ></span>
                          <span
                              style={{                    
                                  position: 'absolute',
                                  content: '""',
                                  height: '24px',
                                  width: '24px',
                                  left: isPublic ? '32px' : '4px',
                                  bottom: '3px',
                                  backgroundColor: 'white',
                                  borderRadius: '50%',
                                  transition: '0.4s'
                              }}
                          ></span>
                      </label>
                  </div>
                </div>
                
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', textAlign: 'left' }}>비밀번호</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    required // 비밀번호 항상 필수
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>
    
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <button
                type="submit"
                style={{
                  padding: '0px 20px',
                  width: '400px',
                  height: '50px',
                  fontSize: '16px',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                수정하기
              </button>
            </div>
          </form>
        </div>
      </div>
        
            
      )}

      {/* 추억 삭제 모달 */}
      {isPostDeleteModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '450px',
              height: '335px',
              position: 'relative',
            }}
          >
            <img
              src={closeIcon}
              alt="Close"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                width: '16px',
                height: '16px',
              }}
              onClick={closePostDeleteModal}
            />
            <h2 style={{ fontSize: '20px', textAlign: 'center', marginBottom: '40px' }}>추억 삭제</h2>
            <p style={{ fontSize: '16px', textAlign: 'left', marginBottom: '15px' }}>삭제 권한 인증</p>
            <div
              className="input-group"
              style={{
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요"
                style={{
                  padding: '10px',
                  fontSize: '14px',
                  marginBottom: '50px',
                }}
              />
            </div>
            <button
              onClick={handleDeletePost}
              style={{
                width: '100%',
                height: '50px',
                backgroundColor: 'black',
                color: 'white',
                fontSize: '16px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

    

        
        
export default ViewPostDetail;
