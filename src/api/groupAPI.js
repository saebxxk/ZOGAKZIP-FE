import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';




// 1. 그룹 등록
export const createGroup = (groupData) => {
  return axios.post(`${API_BASE_URL}/api/groups`, groupData);
};

// 2. 그룹 목록 조회
export const fetchGroups = async () => {

  return new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            status: 200,
            data: [] // 실제 그룹이 없으므로 빈 배열을 반환
        });
    }, 500); // 네트워크 지연을 흉내내기 위해 약간의 딜레이를 추가
});


  //return axios.get(`${API_BASE_URL}/api/groups`);
};

// 3. 그룹 수정
export const updateGroup = (groupId, groupData) => {
  return axios.put(`${API_BASE_URL}/api/groups/${groupId}`, groupData);
};

// 4. 그룹 삭제
export const deleteGroup = (groupId) => {
  return axios.delete(`${API_BASE_URL}/api/groups/${groupId}`);
};

// 5. 그룹 상세 정보 조회
export const fetchGroupById = (groupId) => {
  return axios.get(`${API_BASE_URL}/api/groups/${groupId}`);
};

// 6. 그룹 조회 권한 확인
export const verifyGroupPassword = (groupId, password) => {
  return axios.post(`${API_BASE_URL}/api/groups/${groupId}/verify-password`, { password });
};

// 7. 그룹 공감하기
export const likeGroup = (groupId) => {
  return axios.post(`${API_BASE_URL}/api/groups/${groupId}/like`);
};

// 8. 그룹 공개 여부 확인
export const checkGroupIsPublic = (groupId) => {
  return axios.get(`${API_BASE_URL}/api/groups/${groupId}/is-public`);
};


// 9. 비공개 그룹 목록
export const fetchPrivateGroups = async () => {
  
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            status: 200,
            data: [] // 실제 그룹이 없으므로 빈 배열을 반환
        });
    }, 500); // 네트워크 지연을 흉내내기 위해 약간의 딜레이를 추가
});
  
  //return axios.get(`${API_BASE_URL}/api/groups/private`);
};