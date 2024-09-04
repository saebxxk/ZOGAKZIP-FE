import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGroups } from '../api/groupAPI';
import groupIcon from '../assets/icons/groupicon.svg'; // 이미지 import

function PublicGroupList() {
    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('공감순');
    const [visibleGroups, setVisibleGroups] = useState(24);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching public groups...');
                const response = await fetchGroups();
                console.log('Response:', response); // response 확인
                if (response.status === 200) {
                    console.log('Public groups fetched successfully:', response.data);
                    setGroups(response.data);
                } else {
                    console.error('Failed to fetch public groups with status:', response.status);
                    setError('Failed to load public groups.');
                }
            } catch (error) {
                console.error('Error fetching public groups:', error);
                setError('Failed to load public groups.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
       

    const handlePublicClick = () => {
        // 공개목록
    };

    const handlePrivateClick = () => {
        navigate('/private-group-list');
        // 비공개목록
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        // 정렬 옵션 선택
    };

    const handleCreateGroupClick = () => {
        navigate('/create-group');
        //그룹 생성 페이지로 이동
    };

    // 공개 그룹이므로 항상 공개 그룹 상세 페이지로 이동
    const handleGroupClick = (groupId) => {
        navigate(`/view-public-group-detail/${groupId}`);
      };

    const handleShowMore = () => {
        setVisibleGroups(prev => prev + 4);
        // 더보기 버튼을 누르면 4개씩 증가
    };

    return (
        <div style={{ padding: '20px', width: '100%', position: 'relative' }}>
            <div style={{
                display: 'flex', 
                flexWrap: 'nowrap', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
                height: '50px',
                padding: '5px 10px',
            }}>
                {/* 공개/비공개 버튼 */}
                <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                    <button
                        onClick={handlePublicClick}
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
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
                            backgroundColor: 'white',
                            color: 'black',
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
                    marginLeft: '10px', 
                    flexWrap: 'nowrap',
                    flexGrow: 1
                }}>
                    <input
                        type="text"
                        placeholder="그룹명을 검색해 주세요"
                        value={searchQuery}
                        onChange={handleSearchChange}
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
                        onChange={handleSortChange}
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

            {/* 로딩 중일 때나 오류 발생 시 */}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {/* 그룹 목록 표시 */}
            {!loading && !error && (
                groups.length > 0 ? (
                    <>
                    <div style={{
                        width: '1300px', 
                        height: '700px', 
                        
                        borderRadius: '20px',
                        padding: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)', // 가로 4개씩 배치
                        gridAutoRows: 'minmax(140px, auto)', // 고정된 높이
                        gap: '20px',
                        margin: 'auto', // 가운데 정렬
                        
                        
                    }}>
                        {groups
                            .filter(group => group.name.includes(searchQuery))
                            .sort((a, b) => {
                                // 정렬 옵션에 따른 정렬 로직 구현
                                if (sortOption === '공감순') {
                                    return b.likeCount - a.likeCount;
                                } else if (sortOption === '댓글순') {
                                    return b.commentCount - a.commentCount;
                                } else {
                                    return new Date(b.createdAt) - new Date(a.createdAt);
                                }
                            })
                            .slice(0, visibleGroups)
                            .map(group => (
                                <div key={group.id} 
                                onClick={() => handleGroupClick(group.id)}
                                style={{
                                    width: '320px',
                                    height: '140px',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                    {/* D+nnn 및 비공개 표시 */}
                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <div style={{
                                            backgroundColor: 'white',
                                            padding: '5px',
                                            borderRadius: '5px',
                                            fontWeight: 'bold'
                                        }}>
                                            D+{Math.floor((new Date() - new Date(group.createdAt)) / (1000 * 60 * 60 * 24))}
                                        </div>
                                        <div style={{
                                            backgroundColor: 'white',
                                            padding: '5px',
                                            borderRadius: '5px',
                                            fontWeight: 'bold'
                                        }}>
                                            | 공개
                                        </div>
                                    </div>

                                    {/* 그룹 이름 */}
                                    <div style={{
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        textAlign: 'left'
                                    }}>
                                        {group.name}
                                    </div>

                                    {/* 추억 수 및 그룹 공감 수 */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: '10px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            fontSize: '12px'
                                        }}>
                                            <span>추억</span>
                                            <span>{group.postCount}</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            fontSize: '12px'
                                        }}>
                                            <span>그룹 공감</span>
                                            <span>{group.likeCount}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* 더보기 버튼 */}
                    {groups.length > visibleGroups && (
                        <button
                            onClick={handleShowMore}
                            style={{
                                marginTop: '20px',
                                width: '1560px',
                                height: '60px',
                                border: '1px solid #ccc',
                                fontSize: '14px',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                color: 'black',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            더보기
                        </button>
                    )}
                </>
     
                
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '300px',  
                    marginTop: '100px',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <img src={groupIcon} alt="No Groups" style={{ marginBottom: '20px' }}/>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#808080' }}>등록된 공개 그룹이 없습니다.</p>
                    <p style={{ fontSize: '16px', color: '#808080' }}>가장 먼저 그룹을 만들어보세요!</p>
                    <button
                        onClick={handleCreateGroupClick}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop: '100px'

                        }}
                    >
                        그룹 만들기
                    </button>
                </div>
            )
        
            )}
        </div>
    );
}

export default PublicGroupList;

    