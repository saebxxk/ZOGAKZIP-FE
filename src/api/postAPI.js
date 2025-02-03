import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://zogakzip-be-c3c2.onrender.com';


// 1. 게시글 등록 (그룹 내 게시글 생성)
export const createPost = async (groupId, postData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/groups/${groupId}/posts`, postData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('응답 데이터:', response.data);
    // 응답 데이터를 그대로 반환
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error; // 에러를 다시 던져 호출하는 쪽에서 처리하도록 함
  }
};
// 2. 게시글 목록 조회 (특정 그룹의 게시글 가져오기)
export const fetchPostsByGroupId = async (groupId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/groups/${groupId}/posts`);
    
    console.log(`📌 그룹 ID ${groupId}의 게시글 목록 응답 데이터:`, response.data);
    
    return response.data.data; // ✅ 페이징 처리를 고려하여 그룹의 게시글 목록만 반환
  } catch (error) {
    console.error(`Error fetching posts for group ${groupId}:`, error);
    throw error; // 에러 발생 시 호출하는 쪽에서 처리할 수 있도록 던짐
  }
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
