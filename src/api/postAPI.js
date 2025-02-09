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
export const updatePost = async (postId, postData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/posts/${postId}`, postData, {
      headers: { 'Content-Type': 'multipart/form-data' }, // FormData 처리
    });
    console.log("📌 게시글 수정 응답 데이터:", response.data); // 응답 데이터 디버깅
    return response.data;
  } catch (error) {
    console.error("게시글 수정 오류:", error);
    throw error; // 에러를 다시 던져 호출하는 쪽에서 처리하도록 함
  }
};


// 4. 게시글 삭제 
export const deletePost = (postId) => {
  return axios.delete(`${API_BASE_URL}/api/posts/${postId}`);
};

// 5. 게시글 상세 정보 조회 
export const fetchPostById = async (postId) => {
  try {
    console.log("📌 fetchPostById 실행됨, postId:", postId);
    const response = await axios.get(`${API_BASE_URL}/api/posts/${postId}`);
    console.log("📌 게시글 API 응답:", response);

    if (!response.data || !response.data.post) {
      console.error("🚨 API 응답이 없습니다.");
      return null;
    }

    console.log("✅ 반환될 게시글 데이터:", response.data.post); // 🔥 여기가 정상적으로 출력되는지 확인!

    return response.data.post;
  } catch (error) {
    console.error("🚨 게시글 불러오기 오류:", error);
    return null;
  }
};




{/*}
export const fetchPostById = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/posts/${postId}`);
    const postData = response.data?.post;

    return postData;

    
  } catch (error) {
    console.error("게시글 조회 오류:", error);
    throw error;
  }
};*/}

// 6. 게시글 조회 권한 확인 (비밀번호 인증)
export const verifyPostPassword = async (postId, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/posts/${postId}/verify-password`, { password });
    console.log("📌 비밀번호 인증 응답 데이터:", response.data); // 응답 데이터 디버깅
    return response.data; // 응답 데이터를 반환
  } catch (error) {
    console.error("비밀번호 인증 오류:", error); // 오류 디버깅
    throw error; // 에러를 다시 던져 호출하는 쪽에서 처리하도록 함
  }
};
// 7. 게시글 공감하기 
export const likePost = async (postId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/posts/${postId}/like`);
    console.log("📌 공감 요청 응답 데이터:", response.data); // 응답 데이터 디버깅
    return response.data; // 응답 데이터를 반환
  } catch (error) {
    console.error("공감 요청 오류:", error); // 오류 디버깅
    throw error; // 에러를 다시 던져 호출하는 쪽에서 처리하도록 함
  }
};

// 8. 게시글 공개 여부 확인 
export const checkPostIsPublic = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/posts/${postId}/is-public`);
    console.log("📌 공개 여부 확인 응답 데이터:", response.data); // 응답 데이터 디버깅
    return response.data; // 응답 데이터를 반환
  } catch (error) {
    console.error("공개 여부 확인 오류:", error); // 오류 디버깅
    throw error; // 에러를 다시 던져 호출하는 쪽에서 처리하도록 함
  }
};



