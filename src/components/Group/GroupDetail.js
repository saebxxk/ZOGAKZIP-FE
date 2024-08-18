import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGroupById } from '../../api/groupAPI';

function GroupDetail() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGroupById(id)
            .then(response => {
                setGroup(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load group details.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>

    return (
        <div className="group-detail">
            <img src={group.image} alt={group.name} style={{ width: '200px', height: '200px'}} />
            <h1>{group.name}</h1>
            <p>{group.description}</p>
            <p>디데이: {group.dDay}일</p>
            <p>배지 목록: {group.badges.join(', ')}</p>
            <p>추억 수: {group.postCount}</p>
            <p>공감 수: {group.likeCount}</p>
            {/* 다른 그룹 관련 정보들*/}
        </div>
    );
}

export default GroupDetail;
