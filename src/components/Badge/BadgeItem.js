import React from 'react';
import { Link } from 'react-router-dom';

function BadgeItem({ badge }) {
  return (
    <div className="badge-item">
      <img src={badge.image} alt={badge.name} style={{ width: '50px', height: '50px' }} />
      <h2>{badge.name}</h2>
      <p>{badge.description}</p>
      <Link to={`/view-badge-detail/${badge.id}`}>상세 보기</Link>
    </div>
  );
}

export default BadgeItem;