import axios from 'axios';

const API_BASE_URL = 'https://zogakzip-bmoe.onrender.com';

//1. 댓글 등록
export const createComment = (postId, commentData) => {
    return axios.post(`${API_BASE_URL}/api/posts/${postId}/comments`, commentData);
};
//2. 댓글 목록 조회
export const fetchCommentByPostId = (postId) => {
    return axios.get(`${API_BASE_URL}/api/posts/${postId}/comments`);
}; 
//3. 댓글 수정
export const updateComment = (commentId, commentData) => {
    return axios.put(`${API_BASE_URL}/api/comments/${commentId}`, commentData);
};
//4. 댓글 삭제
export const deleteComment = (commentId) => {
    return axios.delete(`${API_BASE_URL}/api/comments/${commentId}`);
  };