import React from 'react';
import { useParams } from 'react-router-dom';
import GroupDetail from '../components/Group/GroupDetail';


function ViewPublicGroupDetail(){
    const { groupId } = useParams();

    return (
        <div className="view-public-group-detail">
            <h1> Group Detail</h1>
            <GroupDetail groupId={groupId} />
        </div>
    );
}

export default ViewPublicGroupDetail