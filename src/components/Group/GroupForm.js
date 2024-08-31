import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGroup, updateGroup } from '../../api/groupAPI';

function GroupForm({ group, isEditMode }) {
  const [groupName, setGroupName] = useState(group?.name || '');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(group?.image || '');
  const [description, setDescription] = useState(group?.description || '');
  const [isPublic, setIsPublic] = useState(group?.isPublic || true);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const groupData = {
      groupName,
      image,
      description,
      isPublic,
      password: isPublic ? '' : password,
    };

    const apiCall = isEditMode ? updateGroup(group.id, groupData) : createGroup(groupData);

    apiCall.then(() => {
      navigate('/');
    }).catch(error => {
      console.error('Error submitting the form:', error);
    });
  };

  return (
    <div className="create-group">
      <h1 style={{ fontSize: '24px' }}>그룹 만들기</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '400px', height: '75px' }}>
                <label style={{ display: 'block', radius: '6px', marginBottom: '5px', textAlign: 'left' }}>그룹명</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="그룹명을 입력하세요"
                  required
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '400px', height: '75px' }}>
                <label style={{ display: 'block', radius: '6px', marginBottom: '5px', textAlign: 'left' }}>대표 이미지</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={imageName}
                    placeholder="파일을 선택해 주세요"
                    readOnly
                    style={{ flex: 3, padding: '8px', boxSizing: 'border-box', marginRight: '15px' }}
                  />
                  <div style={{ flex: 1}}>
                    <label htmlFor="file-upload" style={{ display: 'inline-block', padding: '8px 12px', backgroundColor: 'black', color: 'white', textAlign: 'center', borderRadius: '4px', cursor: 'pointer', width: '100%', boxSizing: 'border-box'}}>파일선택</label>
          
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
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
          <div style={{ width: '400px', height: '150px' }}>
            <label style={{ display: 'block', radius: '6px', marginBottom: '5px', textAlign: 'left' }}>그룹 소개</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="그룹 소개를 입력하세요"
              required
              style={{ width: '100%', height: '80%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ width: '400px', height: '64px' }}>
          <label style={{ marginBottom: '20px', textAlign: 'left', display: 'block', fontSize: '16px' }}>그룹 공개 선택</label>
          <div style={{ width: '400px', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '5px', color: isPublic ? 'black' : 'gray', width: '50px', textAlign: 'left', paddingRight: '10px' }}>
              {isPublic ? '공개' : '비공개'}
            </span>
            <label
              style={{
                position: 'relative',
                width: '60px',
                height: '30px',
                display: 'inline-block',
                cursor: 'pointer',
                
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
                  cursor: 'pointer'
                }}
              />
              <span
                style={{
                  position: 'absolute',
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
        </div>

            

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ width: '400px', height: '75px' }}>
            <label style={{ display: 'block', radius: '6px', marginBottom: '5px', textAlign: 'left' }}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required={!isPublic} // 비공개 그룹에만 필수 입력
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '80px' }}>
          <button 
            type="submit" 
            style={{ 
              width: '400px', 
              height: '50px', 
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px' 
              }}
            >
              만들기
            </button>
        </div>
      </form>
    </div>
  );
}

export default GroupForm;

