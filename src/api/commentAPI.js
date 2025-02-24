import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://zogakzip-be-c3c2.onrender.com';

// 1. 댓글 등록
export const createComment = async (postId, commentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/posts/${postId}/comments`, commentData);
      console.log("📌 댓글 생성 응답 데이터:", response.data);
      
      // 응답 데이터를 그대로 반환
      return response.data;
    } catch (error) {
      console.error("🚨 댓글 생성 오류:", error);
      throw error; // 에러를 다시 던져 호출하는 쪽에서 처리하도록 함
    }
  };
  
// 2. 댓글 목록 조회
export const fetchCommentByPostId = async (postId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts/${postId}/comments`);
      
      console.log("📌 댓글 목록 응답 데이터:", response.data);
      
      // 응답 데이터에서 댓글 목록만 반환 (페이징 처리된 데이터가 있다면 구조에 맞게 조정)
      return response.data.data || response.data; 
    } catch (error) {
      console.error("🚨 댓글 목록 조회 오류:", error);
      throw error; // 에러 발생 시 호출하는 쪽에서 처리할 수 있도록 던짐
    }
  };
  
// 3. 댓글 수정
export const updateComment = async (commentId, commentData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/comments/${commentId}`, commentData, {
        headers: { 'Content-Type': 'application/json' }, // JSON 데이터 전송
      });
  
      console.log("📌 댓글 수정 응답 데이터:", response.data);
      
      return response.data;
    } catch (error) {
      console.error("🚨 댓글 수정 오류:", error);
      throw error;
    }
  };
  
//4. 댓글 삭제
export const deleteComment = (commentId) => {
    return axios.delete(`${API_BASE_URL}/api/comments/${commentId}`);
  };