import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../api/postAPI';

function CreatePost({ post, isEditMode }) {
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [location, setLocation] = useState('');
  const [momentDate, setMomentDate] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file ? file.name : '');
  };

  const handleToggleChange = () => {
    setIsPublic(!isPublic);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      setTags((prevTags) => [...prevTags, newTag]);
      setTagInput(''); // 입력 필드 초기화
    }
  };

  const handleTagDelete = (indexToDelete) => {
    setTags(tags.filter((_, index) => index !== indexToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // 브라우저의 기본 폼 제출 동작을 막지 않음

    const postData = {
      nickname,
      title,
      image,
      content,
      tags,
      location,
      momentDate,
      isPublic,
      password,
    };

    const apiCall = isEditMode ? updatePost(post.id, postData) : createPost(postData);

    apiCall.then(() => {
      navigate('/'); // 성공 시 홈으로 이동
    }).catch(error => {
      console.error('Error submitting the form:', error);
    });
  };

  return (
    <div className="create-memory" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>추억 올리기</h1>
      
      {/* 폼 태그로 감싸기 */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
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
            올리기
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;

