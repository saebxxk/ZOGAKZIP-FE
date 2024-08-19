import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGroupById, checkGroupIsPublic, verifyGroupPassword } from '../../api/groupAPI';

function GroupDetail() {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPublic, setIsPublic] = useState(true); // 그룹 공개 여부
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchGroupById(groupId)
            .then(response => {
                setGroup(response.data.isPublic);

                if (response.data.isPublic) {
                    loadGroupDetails(); // 그룹이 공개인 경우 로드
                } else {
                    setLoading(false); // 비공개 그룹일 경우 비밀번호 입력 대기
                }
            })
            .catch(error => {
                setError('Failed to load group details.');
                setLoading(false);
            });
    }, [groupId]);

    const loadGroupDetails = () => {
        fetchGroupById(groupId)
            .then(response => {
                setGroup(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Faild to load group details.');
                setLoading(false);
            });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        verifyGroupPassword(groupId, password)
            .then(() => {
                loadGroupDetails(); //비밀번호가 맞으면 그룹 정보 로드
            })
            .catch(error => {
                setError('Incorrect password');
                setLoading(false);
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>

    return (
        <div className="group-detail">
            {isPublic || group ? (
                <>
                    <img src={group.image} alt={group.name} style={{ width: '200px', height: '200px'}} />
                    <h1>{group.name}</h1>
                    <p>{group.description}</p>
                    <p>디데이: {group.dDay}일</p>
                    <p>배지 목록: {group.badges.join(', ')}</p>
                    <p>추억 수: {group.postCount}</p>
                    <p>공감 수: {group.likeCount}</p>
                </>
            ) : (
                <form onSubmit={handlePasswordSubmit}>
                    <p>비공개 그룹입니다. 비밀번호를 입력하세요.</p>
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

export default GroupDetail;
