import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyPostPassword } from '../api/postAPI';

function CheckPrivatePost() {
  const { postId } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가


  const handleSubmit = (e) => {
    e.preventDefault();
    verifyPostPassword(postId, password)
      .then(() => {
        navigate(`/view-post-detail/${postId}`);
      })
      .catch(() => {
        setError('Incorrect password.');
        setModalOpen(true); // 비밀번호 틀리면 모달 열기
      });
  };

  const handleModalClose = () => {
    setModalOpen(false); // 모달 닫기
  };

  return (
    <div className="check-private-post" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', transform: 'translateY(-200px)' }}>
      <div style={{ width: '400px', height: '313px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>

        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>비공개 추억</h1>
        <p style={{ fontSize: '14px', marginTop: '0px' }}>비공개 추억에 접근하기 위해 권한 확인이 필요합니다.</p>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ width: '400px', height: '75px' }}>
            <label style={{ display: 'block', marginBottom: '10px', marginTop: '30px', textAlign: 'left' }}>비밀번호를 입력해주세요</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button 
          type="submit"
          style={{
            width: '400px',
            height: '50px',
            padding: '10px 0', 
            marginTop: '30px',
            backgroundColor: 'black',
            color: 'white',               
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px' 
          }}
          >
            제출하기
            </button>
        </form>
      </div>
      {/* 모달 */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000'
        }}>
          <div style={{
            width: '480px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <h2>비공개 추억 접근 실패</h2>
            <p>비밀번호가 일치하지 않습니다.</p>
            <button onClick={handleModalClose} style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              확인
            </button>
          </div>
        </div>
      )}



    </div>
  );
}

export default CheckPrivatePost;
