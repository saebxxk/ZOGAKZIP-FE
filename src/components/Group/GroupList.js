import React from 'react';
import GroupItem from './GroupItem'; //GroupItem 컴포넌트 가져옴. 각 그룹의 정보를 개별적으로 렌더링

function GroupList({ groups }) { //groups 라는 배열을 props로 받아 옴
    return (
        <div className="group-list">
            {groups.map(group => (
                <GroupItem key={group.id} group={group} />
            ))}
        </div>
    );
}

export default GroupList;