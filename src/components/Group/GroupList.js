import React from 'react';
import GroupItem from './GroupItem';

function GroupList({ groups }) {
    return (
        <div className="group-list">
            {groups.map(group => (
                <GroupItem key={group.id} group={group} />
            ))}
        </div>
    );
}

export default GroupList;