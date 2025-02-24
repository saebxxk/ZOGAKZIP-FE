import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, likePost, verifyPostPassword, checkPostIsPublic } from '../api/postAPI';
import { createComment, fetchCommentByPostId, updateComment, deleteComment } from '../api/commentAPI';
import CommentList from '../components/Comment/CommentList';
import CommentForm from '../components/Comment/CommentForm';
import editIcon from '../assets/icons/icon=edit.svg';
import deleteIcon from '../assets/icons/icon=delete.svg';
import closeIcon from '../assets/icons/icon=x.svg';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://zogakzip-be-c3c2.onrender.com';

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


  // 수정 모달을 여는 함수
  const openPostEditModal = () => {
    setIsPostEditModalOpen(true);
  };

  // 수정 모달을 닫는 함수
  const closePostEditModal = () => {
    setIsPostEditModalOpen(false);
  };
  


   // 모달 열기/닫기 함수
   const openPostDeleteModal = () => {
    setIsPostDeleteModalOpen(true);
  };

  const closePostDeleteModal = () => {
    setIsPostDeleteModalOpen(false);
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
  console.log("📌 ViewPostDetail 렌더링됨, postId:", postId);

  useEffect(() => {

    

    if (postId === undefined || postId === null) {
      console.warn("🚨 postId가 아직 설정되지 않았습니다.");
      return;
    }
  
    console.log("✅ useEffect 실행됨, postId:", postId);
    const checkVisibilityAndLoad = async () => {
      try {
        // 게시글 공개 여부 확인
        const visibilityResponse = await checkPostIsPublic(postId);
        console.log("공개 여부 확인 응답 데이터:", visibilityResponse);
        setIsPublic(visibilityResponse.isPublic);
  
        if (visibilityResponse.isPublic) {
          // 공개 게시글일 경우 데이터 로드
          console.log("✅ 게시글이 공개 상태입니다. 데이터 로드를 시작합니다.");
          const postResponse = await fetchPostById(postId);
          console.log("📌 postResponse 값 확인 (받아온 데이터):", postResponse);

          if (!postResponse) {
            throw new Error("🚨 게시글 데이터를 불러오지 못했습니다.");
          }
    
          console.log("📌 최종적으로 setPost에 저장될 데이터:", postResponse);
          setPost(postResponse);


        } else {
          // 비공개 게시글일 경우 로딩 종료
          setLoading(false);
        }
      } catch (error) {
        console.error("게시글 공개 여부 확인 실패:", error);
        setError("게시글 정보를 불러오는 중 오류가 발생했습니다.");
        
      } finally {
        setLoading(false); // 항상 실행
      }
    };
  
    if (postId) {
      checkVisibilityAndLoad();
    }
  }, [postId]);

  useEffect(() => {
    console.log("📌 post 상태 변경 감지됨:", post);
    if (post?.comments) {
      console.log("📌 post.comments 값:", post.comments);
    }
  }, [post]); // ✅ post 상태가 변경될 때마다 실행
  
  const handleLike = async () => {
    try {
      // 먼저 UI 업데이트 (낙관적 업데이트)
      setPost(prevPost => ({
        ...prevPost,
        likeCount: prevPost.likeCount + 1,
      }));
  
      await likePost(postId);
      
      // 최신 상태 다시 불러오기
      const postResponse = await fetchPostById(postId);
      setPost(postResponse.data);
    } catch (error) {
      console.error("좋아요 오류:", error);
      setError("좋아요를 처리하는 중 오류가 발생했습니다.");
    }
  };
  
  

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 비밀번호 확인 API 호출
      await verifyPostPassword(postId, password);
  
      // 비밀번호 확인 후 게시글 로드
      const postResponse = await fetchPostById(postId);
      setPost(postResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("비밀번호 확인 실패:", error);
      setError("비밀번호가 잘못되었습니다.");
      setLoading(false);
    }
  };

  // 게시글 수정
  const handleEditPost = async (e) => {
    e.preventDefault();
  
    try {
      if (!postId) {
        alert("게시글 ID를 찾을 수 없습니다.");
        return;
      }
  
      // 게시글 수정할 데이터 준비 (FormData 사용)
      const updatedData = new FormData();
      updatedData.append("title", title);
      updatedData.append("content", content);
      updatedData.append("location", location);
      updatedData.append("momentDate", momentDate);
      updatedData.append("isPublic", isPublic);
      updatedData.append("password", password);
  
      if (imageName) {
        updatedData.append("image", imageName); // 새 이미지 업로드
      }
  
      console.log("📌 수정 요청 데이터:", updatedData);
  
      // API 호출
    const response = await axios.put(`${API_BASE_URL}/api/posts/${postId}`, updatedData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

  
      if (response.status >= 200 && response.status < 300) {
        alert("게시글이 성공적으로 수정되었습니다.");
        
        closePostEditModal(); // 모달 닫기

        setTimeout(() => {
          window.location.reload(); // ✅ 수정 후 페이지 새로고침
        }, 100);

      } else {
        throw new Error(response.data?.message || "게시글 수정 실패");
      }
    } catch (error) {
      console.error("게시글 수정 오류:", error);
      alert(error.response?.data?.message || "게시글을 수정하는 중 오류가 발생했습니다.");
    }
  };

  //게시글 삭제
  const handleDeletePost = async () => {
    try {
      if (!postId) {
        alert("게시글 ID를 찾을 수 없습니다.");
        return;
      }
  
      if (!deletePassword) {
        alert("비밀번호를 입력하세요.");
        return;
      }
  
      if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
        return;
      }

      console.log("📌 삭제 요청 데이터:", { password: deletePassword });

  
      // API 호출 (비밀번호 포함)
      const response = await axios.delete(`${API_BASE_URL}/api/posts/${postId}`, {
        data: { password: deletePassword }, // 비밀번호 전송
      });

      console.log("✅ 게시글 삭제 성공:", response);
  
      if (response.status === 200) {
        alert("게시글이 성공적으로 삭제되었습니다.");
        closePostDeleteModal();
        window.location.href = "/"; // 삭제 후 홈으로 이동
      } else {
        throw new Error("게시글 삭제 실패");
      }
    } catch (error) {
      console.error("게시글 삭제 오류:", error);
      alert(error.response?.data?.message || "게시글을 삭제하는 중 오류가 발생했습니다.");
    }
  };


  const handleSubmitComment = async () => {
    console.log("✅ handleSubmitComment 실행됨"); // 함수 실행 여부 확인
    if (!nickname.trim() || !comment.trim() || !commentPassword.trim()) {
      alert("닉네임, 댓글, 비밀번호를 입력하세요.");
      return;
    }
  
    try {
      const newComment = {
        postId,
        nickname,
        content: comment,
        password: commentPassword,
      };

      const response = await createComment(postId, newComment); // ✅ `axios.post` 대신 `createComment` 사용

    if (response) {
      alert("댓글이 성공적으로 등록되었습니다.");
      setComment(""); 
      setCommentPassword("");
      setNickname("");
      closeCommentModal();

      // 최신 댓글 목록 다시 불러오기
      const updatedPost = await fetchPostById(postId);
      console.log("📌 댓글 등록 후 최신 post 데이터:", updatedPost);
      // 상태 업데이트 시 함수형 업데이트 사용
      setPost(prevPost => {
        console.log("📌 상태 업데이트 이전 prevPost 값:", prevPost);
        return {
          ...prevPost,
          comments: updatedPost?.comments || [],
        };
      });

      setTimeout(() => {
        console.log("📌 상태 업데이트 후 post 값:", post);
      }, 500);
    }
      
    
  } catch (error) {
    console.error("댓글 등록 오류:", error);
    alert("댓글을 등록하는 중 오류가 발생했습니다.");
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

  {/*const handleSubmitComment = () => {
    // 댓글 등록 로직 구현
    closeCommentModal(); // 등록 후 모달 닫기
  };*/}

  const handleEditComment = () => {
    // 댓글 수정 로직
    closeEditModal(); // 수정 후 모달 닫기
  };

  const handleDeleteComment = () => {
    // 댓글 삭제 로직
    closeDeleteModal(); // 삭제 후 모달 닫기
  };




    
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
        <img src={post.image} alt="이미지" style={{ width: '200px', height: '200px' }} />
        <p style={{ fontSize: '16px', textAlign: 'center' }}>{post.content}</p>
        <button onClick={openCommentModal} style={{ fontSize: '14px', padding: '10px 20px', width: '300px', height: '40px', borderRadius:'6px', backgroundColor: 'black', color: 'white', cursor: 'pointer', marginBottom: '40px' }}>댓글 등록하기</button>

        <p style={{ fontSize: '14px', alignSelf: 'flex-start', margin: 0}}>댓글 {post.commentCount}</p>
      </div>


      

       {/* 하단부 */}
       <div className="post-comments" style={{ padding: '10px' }}>
        
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        {post?.comments?.map(comment => (
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
          <form onSubmit={handleEditPost}>
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
