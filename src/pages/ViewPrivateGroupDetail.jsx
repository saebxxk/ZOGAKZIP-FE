import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGroupById, updateGroup, verifyGroupPassword } from '../api/groupAPI'; // 그룹 데이터 가져오기
import groupIcon from '../assets/icons/groupicon.svg'; // 아이콘 경로
import closeIcon from '../assets/icons/icon=x.svg';
import { likeGroup } from '../api/groupAPI';

function ViewPrivateGroupDetail() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('공감순');
  const [visibleMemories, setVisibleMemories] = useState(24);
  const [filter, setFilter] = useState('공개');
  const [isGroupEditModalOpen, setIsGroupEditModalOpen] = useState(false);
  const [name, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false); // 비공개로 설정
  const [imageName, setImageName] = useState('');
  const [password, setPassword] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [isGroupDeleteModalOpen, setIsGroupDeleteModalOpen] = useState(false);
  const [groupPassword, setGroupPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false); // 비밀번호 인증 상태

  // 삭제 모달 열기/닫기 함수
  const openGroupDeleteModal = () => setIsGroupDeleteModalOpen(true);
  const closeGroupDeleteModal = () => setIsGroupDeleteModalOpen(false);

  // 수정 모달 열기/닫기 함수
  const openGroupEditModal = () => setIsGroupEditModalOpen(true);
  const closeGroupEditModal = () => setIsGroupEditModalOpen(false);

  // 비공개 그룹 접근을 위한 비밀번호 검증
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyGroupPassword(groupId, groupPassword);
      if (response.status === 200) {
        setIsVerified(true);
        fetchGroupData();
        alert('비밀번호 인증 성공!');
      } else {
        alert('비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      console.error('비밀번호 인증 실패:', error);
      alert('비밀번호 인증에 실패했습니다.');
    }
  };

  const fetchGroupData = async () => {
    try {
      const response = await fetchGroupById(groupId);
      if (response.status === 200) {
        setGroupData(response.data);
        setLikeCount(response.data.likeCount);
      } else {
        setError('그룹 정보를 가져오지 못했습니다.');
      }
    } catch (error) {
      setError('그룹 정보를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 그룹 삭제 처리 함수
  const handleGroupDelete = () => {
    console.log('그룹 삭제 비밀번호:', groupPassword);
    closeGroupDeleteModal(); // 삭제 완료 후 모달 닫기
  };

  // 그룹 수정 처리 함수
  const handleGroupUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      description,
      isPublic,
      imageName,
    };
    try {
      await updateGroup(groupId, updatedData);
      alert('그룹이 성공적으로 수정되었습니다.');
      closeGroupEditModal();
    } catch (error) {
      console.error('그룹 수정 실패:', error);
      alert('그룹 수정에 실패했습니다.');
    }
  };

  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
    }
  };

  const handleLikeClick = async () => {
    try {
      await likeGroup(groupId); // 공감 API 호출
      setLikeCount((prevCount) => prevCount + 1); // 공감 수 증가
    } catch (error) {
      console.error("공감 처리 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    if (isVerified) {
      fetchGroupData();
    }
  }, [isVerified]);

  const handlePublicClick = () => {
    setFilter('공개'); // 공개 필터 적용
  };

  const handlePrivateClick = () => {
    setFilter('비공개'); // 비공개 필터 적용
  };

  const handleShowMore = () => setVisibleMemories((prev) => prev + 4);
  const handleCreateMemoryClick = () => {
    navigate('/create-post'); // 추억 올리기 페이지로 이동
  };

  const filteredMemories = groupData?.memories
    ? groupData.memories
        .filter((memory) => memory.title.includes(searchQuery))
        .sort((a, b) => {
          if (sortOption === '공감순') return b.likeCount - a.likeCount;
          if (sortOption === '댓글순') return b.commentCount - a.commentCount;
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .slice(0, visibleMemories)
    : [];



  if (loading) return <p>Loading group details...</p>;
  if (error) return <p>{error}</p>;
  if (!groupData) return <p>No group data available.</p>;

  // 비밀번호가 인증되지 않았을 경우 비밀번호 입력 화면 표시

  
  if (!isVerified) {
    return (
      <div className="group-password-container" style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>비공개 그룹입니다.</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>비밀번호를 입력해 주세요.</p>
        <form onSubmit={handlePasswordSubmit} style={{ textAlign: 'center' }}>
          <input
            type="password"
            value={groupPassword}
            onChange={(e) => setGroupPassword(e.target.value)}
            placeholder="비밀번호"
            style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: 'black',
              color: 'white',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            확인
          </button>
        </form>
      </div>
    );
  }
    

  return (
    <div className="group-detail-container" style={{ width: '80%', margin: '0 auto', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      {/* 상단부 */}
      <div className="group-header" style={{ marginBottom: '20px', display: 'flex' }}>
        <div className="group-image" style={{ flex: '1', marginRight: '20px' }}>
          <img src={groupData.image || 'default-image-url'} alt={groupData.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
        </div>

        <div className="group-info" style={{ flex: '2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="header-top" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
            <div style={{ fontSize: '14px' }}>
              <span>{groupData.adminNickname}</span> <span>| {groupData.isPublic ? '공개' : '비공개'}</span>
            </div>
            <div style={{ fontSize: '14px' }}>
              <button 
                onClick={openGroupEditModal}
                style={{ marginRight: '10px', backgroundColor: 'white', border: 'none', cursor: 'pointer' }}>그룹 수정하기</button>
              <button 
                onClick={openGroupDeleteModal}
                style={{ backgroundColor: 'white', border: 'none', cursor: 'pointer'}}>그룹 삭제하기</button>
            </div>
          </div>

          <div className="group-title" style={{ padding: '20px 10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              {/* 그룹 이름 */}
              <h1 style={{ fontSize: '30px', marginBottom: '10px', display: 'inline-block' }}>{groupData.name}</h1>
              {/* 그룹 설명 */}
              <p style={{ fontSize: '16px', marginTop: '10px', marginBottom: '20px', color: '#555' }}>{groupData.description}</p>
              <div className="group-stats" style={{ fontSize: '18px', display: 'inline-block', marginLeft: '30px' }}>
                <span>추억 {groupData.postCount}</span>
                <span style={{ margin: '0 15px', height: '24px', width: '1px', backgroundColor: '#ccc', display: 'inline-block' }} />
                <span>그룹 공감 {groupData.likeCount}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '15px' }}>
            <button 
              onClick={handleLikeClick}
              style={{ cursor: 'pointer', fontSize: '14px', padding: '10px 20px', borderRadius: '6px', backgroundColor: 'white', border: '1px solid #ccc' }}>공감 보내기</button>
          </div>
        </div>
      </div>

      {/* 가로줄 */}
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} /> 

      {/* 하단부: 추억 목록 */}
      <div className="group-content" style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', textAlign: 'center', flex: '1', margin: 0 }}>추억 목록</h2>
          <button
            onClick={handleCreateMemoryClick}
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '6px',
              height: '45px',
              marginLeft: 'auto'
            }}
          >
            추억 올리기
          </button>
        </div>

        {/* 검색창 및 정렬 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex' }}>
            <button 
                onClick={handlePublicClick}
                style={{ 
                    backgroundColor: filter === '공개' ? 'black' : 'white', 
                    color: filter === '공개' ? 'white' : 'black', 
                    padding: '10px 20px',
                    marginRight: '10px', 
                    border: 'none', 
                    cursor: 'pointer', 
                    width: '80px', 
                    borderRadius: '22.5px', 
                    height: '45px' 
                }}
            >
              공개
            </button>
            <button 
                onClick={handlePrivateClick}
                style={{ 
                    backgroundColor: filter === '비공개' ? 'black' : 'white', 
                    color: filter === '비공개' ? 'white' : 'black', 
                    padding: '10px 20px', 
                    border: '1px solid black', 
                    cursor: 'pointer', 
                    width: '80px', 
                    borderRadius: '22.5px', 
                    height: '45px', 
                    marginRight: '30px' 
                }}
            >
              비공개
            </button>
          </div>

          {/* 검색창 및 정렬 */}
          <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1,
                marginLeft: '10px',
                flexWrap: 'nowrap' 
            }}>
            <input
              type="text"
              placeholder="추억명을 검색해 주세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '4px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                flexGrow: 1,
                height: '45px',
                marginRight: '30px'
              }}
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '150px',
                height: '45px',
                marginRight: '100px'
              }}
            >
              <option value="공감순">공감순</option>
              <option value="댓글순">댓글순</option>
              <option value="최신순">최신순</option>
            </select>
          </div>
        </div>

        {/* 추억 목록 표시 */}
        {filteredMemories.length > 0 ? (
          <>
            <div style={{ width: '1300px', borderRadius: '20px', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', margin: 'auto' }}>
              {filteredMemories.map((memory) => (
                <div key={memory.id} style={{ width: '320px', height: '140px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px', fontWeight: 'bold' }}>
                      D+{Math.floor((new Date() - new Date(memory.createdAt)) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px', fontWeight: 'bold', marginLeft: '10px' }}>
                      | {memory.isPublic ? '공개' : '비공개'}
                    </div>
                  </div>
                  <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px', textAlign: 'left' }}>{memory.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px' }}>
                      <span>댓글</span>
                      <span>{memory.commentCount}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px' }}>
                      <span>공감</span>
                      <span>{memory.likeCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 더보기 버튼 */}
            {groupData.memories && groupData.memories.length > visibleMemories && (
              <button
                onClick={handleShowMore}
                style={{ marginTop: '20px', width: '100%', height: '60px', border: '1px solid #ccc', fontSize: '14px', textAlign: 'center', backgroundColor: 'white', color: 'black', borderRadius: '6px', cursor: 'pointer' }}
              >
                더보기
              </button>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', marginTop: '100px', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
            <img src={groupIcon} alt="No Memories" style={{ marginBottom: '20px' }} />
            <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#808080' }}>등록된 추억이 없습니다.</p>
            <p style={{ fontSize: '16px', color: '#808080' }}>가장 먼저 추억을 만들어보세요!</p>
            <button onClick={handleCreateMemoryClick} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' }}>
              추억 만들기
            </button>
          </div>
        )}
      </div>



      {/* 그룹 삭제 모달 */}
{isGroupDeleteModalOpen && (
  <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="modal-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '450px', height: '335px', position: 'relative' }}>
      <img src={closeIcon} alt="Close" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', width: '16px', height: '16px' }} onClick={closeGroupDeleteModal} />
      <h2 style={{ fontSize: '20px', textAlign: 'center', marginBottom: '40px' }}>그룹 삭제</h2>
      <p style={{ fontSize: '16px', textAlign: 'left', marginBottom: '15px' }}>삭제 권한 인증</p>
      <div className="input-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="password" 
          value={groupPassword} 
          onChange={(e) => setGroupPassword(e.target.value)} 
          placeholder="비밀번호를 입력해 주세요"
          style={{ padding: '10px', fontSize: '14px', marginBottom: '50px'}} />
      </div>
      <button onClick={handleGroupDelete} style={{ width: '100%', height: '50px', backgroundColor: 'black', color: 'white', fontSize:'16px', borderRadius: '6px', cursor: 'pointer' }}>삭제하기</button>
    </div>
  </div>
)}

{isGroupEditModalOpen && (
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
    <div
      style={{
        width: '450px',
        height: '650px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}
    >
      <img src={closeIcon} alt="Close" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={closeGroupEditModal} />
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>그룹 수정하기</h1>
      <form onSubmit={handleGroupUpdate}>
        {/* 그룹명 입력 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>그룹명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="그룹명을 입력하세요"
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* 대표 이미지 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>대표 이미지</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={imageName}
              placeholder="파일을 선택해 주세요"
              readOnly
              style={{ flex: 3, padding: '8px', marginRight: '15px' }}
            />
            <div style={{ flex: 1 }}>
              <label
                htmlFor="file-upload"
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'black',
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                파일선택
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

        {/* 그룹 설명 입력 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>그룹 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="그룹을 소개해 주세요"
            required
            style={{ width: '100%', height: '150px', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* 공개 여부 토글 */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ marginBottom: '10px', display: 'block', textAlign: 'left' }}>그룹 공개 선택</label>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '30px', textAlign:'left' }}>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic((prev) => !prev)}
              style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
            />
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: isPublic ? 'black' : 'gray', borderRadius: '30px', transition: '0.4s' }} />
            <span style={{ position: 'absolute', left: isPublic ? '32px' : '4px', bottom: '3px', width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%', transition: '0.4s' }} />
          </label>
        </div>

         {/* 비밀번호 */}
         <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>수정 권한 인증</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        {/* 수정 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}

export default ViewPrivateGroupDetail;
