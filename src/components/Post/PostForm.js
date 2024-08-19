import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../api/postAPI';

function PostForm({ post, isEditMode }) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    image: post?.image || '',
    description: post?.description || '',
    location: post?.location || '',
    tags: post?.tags || [],
    moment: post?.moment || '',
    isPublic: post?.isPublic || true,
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTagChange = (e) => {
    setFormData(prevState => ({ ...prevState, tags: e.target.value.split(',') }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = isEditMode ? updatePost(post.id, formData) : createPost(formData);

    apiCall.then(() => {
      navigate('/'); // 성공 시 홈으로 이동
    }).catch(error => {
      console.error('Error submitting the form:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" name="image" value={formData.image} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </div>
      <div>
        <label>Tags (comma separated):</label>
        <input type="text" name="tags" value={formData.tags.join(',')} onChange={handleTagChange} />
      </div>
      <div>
        <label>Moment:</label>
        <input type="text" name="moment" value={formData.moment} onChange={handleChange} />
      </div>
      <div>
        <label>Public:</label>
        <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={() => setFormData(prevState => ({ ...prevState, isPublic: !prevState.isPublic }))} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required={!isEditMode} />
      </div>
      <button type="submit">{isEditMode ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
}

export default PostForm;
