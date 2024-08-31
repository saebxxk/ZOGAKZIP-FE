import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyPostPassword } from '../api/postAPI';

function CheckPrivatePost() {
  const { postId } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyPostPassword(postId, password)
      .then(() => {
        navigate(`/view-post-detail/${postId}`);
      })
      .catch(() => {
        setError('Incorrect password.');
      });
  };

  return (
    <div className="check-private-post" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default CheckPrivatePost;
