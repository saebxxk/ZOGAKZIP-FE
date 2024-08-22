import React from 'react';
import GroupForm from '../components/Group/GroupForm';

function CreateGroup() {
  return (
    <div className="create-group">
      <h1>Create a New Group</h1>
      <GroupForm isEditMode={false} />
    </div>
  );
}

export default CreateGroup;
