import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //페이지 이동처리
import { createGroup, updateGroup } from '../../api/groupAPI'; //그룹 생성, 업데이트를 위한 API호출 함수를 가져옴

function GroupForm({ group, isEditMode }) {
    const [formData, setFormData] = useState({
        name: group?.name || '',
        image: group?.image || '',
        description: group?.description || '',
        isPublic: group?.isPublic || true,
        password: ''
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }; // 폼 필드 변경시 호출

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiCall = isEditMode ? updateGroup(group.id, formData) : createGroup(formData);

        apiCall.then(() => {
            navigate('/');
        }).catch(error => {
            console.error('Error submitting the form:', error);
        });
    }; //폼이 제출될 때 호출

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Group Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Group Image URL:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />

            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Public:</label>
                <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={() => setFormData(prevState => ({ ...prevState, isPublic: !prevState.isPublic}))} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required={!isEditMode} />

            </div>
            <button type="submit">{isEditMode ? 'Update Group' : 'Create Group'}</button>
        </form>
    );
}

export default GroupForm;