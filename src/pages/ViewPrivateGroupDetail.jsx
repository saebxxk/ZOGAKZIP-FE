import React from 'react';
import { useParams } from 'react-router-dom';
import GroupDetail from '../components/Group/GroupDetail';

function ViewPrivateGroupDetail() {
  const { groupId } = useParams();

  return (
    <div className="view-private-group-detail">
      <h1>Private Group Detail</h1>
      <GroupDetail groupId={groupId} />
    </div>
  );
}

export default ViewPrivateGroupDetail;