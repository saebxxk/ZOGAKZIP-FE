import React from 'react';
import { Link } from 'react-router-dom';

function GroupItem({ group }) {
    return (
        <div className="group-item">
            <img src={group.image} alt={group.name} style={{ width: '100px', height: '100px' }} />
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            <p>디데이: {group.dDay}일</p>
            <p>배지 수: {group.badgeCount}</p>
            <p>추억 수: {group.postCount}</p>
            <p>공감 수: {group.likeCount}</p>
            <Link to={`/view-group-detail/${group.id}`}>상세 보기</Link>
        </div>
    );
}

export default GroupItem;