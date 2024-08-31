import React, { useState } from 'react';
import GroupForm from '../components/Group/GroupForm';

function CreateGroup() {
  return (
    <div className="create-group">
     
      <GroupForm isEditMode={false} />
    </div>
  );
}

export default CreateGroup; 


