import React from 'react';
import BadgeItem from './BadgeItem';

function BadgeList({ badges }) {
  return (
    <div className="badge-list">
      {badges.map(badge => (
        <BadgeItem key={badge.id} badge={badge} />
      ))}
    </div>
  );
}

export default BadgeList;
