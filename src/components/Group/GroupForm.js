import React, { useState } from 'react';
import { useNaviate } from 'react-router-dom';
import { createGroup, updateGroup } from '../../api/groupAPI';

function GroupForm({ group, isEditMode }) {
    const [formData, setFormData] = useState({
        name: group?.name || '',
        image: group?.image || '',
        description: group?.description || '',
        isPubllic: group?.isPublic || true,
        password: ''
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiCall = isEditMode ? updateGroup(group.id, formData) : createGroup(formData);

        apiCall.then(() => {
            navigate('/');
        }).catch(error => {
            console.error('Error submitting the form:', error);
        });
    };

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