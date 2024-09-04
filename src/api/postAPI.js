import axios from 'axios';

const API_BASE_URL = 'https://zogakzip-bmoe.onrender.com';
// 1. 게시글 등록 
export const createPost = (groupId, postData) => {
  return axios.post(`${API_BASE_URL}/api/groups/${groupId}/posts`, postData);
};

// 2. 게시글 목록 조회 
export const fetchPostsByGroupId = (groupId) => {
  return axios.get(`${API_BASE_URL}/api/groups/${groupId}/posts`);
};

// 3. 게시글 수정 
export const updatePost = (postId, postData) => {
  return axios.put(`${API_BASE_URL}/api/posts/${postId}`, postData);
};

// 4. 게시글 삭제 
export const deletePost = (postId) => {
  return axios.delete(`${API_BASE_URL}/api/posts/${postId}`);
};

// 5. 게시글 상세 정보 조회 
export const fetchPostById = (postId) => {
  return axios.get(`${API_BASE_URL}/api/posts/${postId}`);
};

// 6. 게시글 조회 권한 확인 
export const verifyPostPassword = (postId, password) => {
  return axios.post(`${API_BASE_URL}/api/posts/${postId}/verify-password`, { password });
};

// 7. 게시글 공감하기 
export const likePost = (postId) => {
  return axios.post(`${API_BASE_URL}/api/posts/${postId}/like`);
};

// 8. 게시글 공개 여부 확인 
export const checkPostIsPublic = (postId) => {
  return axios.get(`${API_BASE_URL}/api/posts/${postId}/is-public`);
};
