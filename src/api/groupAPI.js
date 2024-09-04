import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://zogakzip-bmoe.onrender.com';

// 1. 그룹 등록 (그룹 생성)
export const createGroup = (formData) => {
  return axios.post(`${API_BASE_URL}/api/groups`, formData);
};

// 2. 공개 그룹 목록 조회
export const fetchGroups = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          {
            id: 2,
            name: '공개 그룹 1',
            description: '이것은 첫 번째 공개 그룹입니다.',
            isPublic: true,
          },
          {
            id: 4,
            name: '공개 그룹 2',
            description: '두 번째 공개 그룹입니다.',
            isPublic: true,
          },
        ],
      });
    }, 500); // 네트워크 지연을 흉내내기 위한 딜레이
  });
};

// 3. 그룹 수정 (그룹 정보 업데이트)
export const updateGroup = (groupId, groupData) => {
  return axios.put(`${API_BASE_URL}/api/groups/${groupId}`, groupData);
};

// 4. 그룹 삭제
export const deleteGroup = (groupId) => {
  return axios.delete(`${API_BASE_URL}/api/groups/${groupId}`);
};

// 5. 그룹 상세 정보 조회 (공개 그룹 및 비공개 그룹)
export const fetchGroupById = (groupId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          id: groupId,
          name: `그룹 ${groupId}`,
          description: `이것은 ID가 ${groupId}인 그룹의 상세 정보입니다.`,
          isPublic: groupId % 2 === 0, // 짝수 ID는 공개 그룹
        },
      });
    }, 500);
  });
};

// 6. 비공개 그룹에 접근할 수 있는지 비밀번호 확인
export const verifyGroupPassword = (groupId, password) => {
  return axios.post(`${API_BASE_URL}/api/groups/${groupId}/verify-password`, { password });
};

// 7. 비공개 그룹 목록 조회
export const fetchPrivateGroups = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          {
            id: 3,
            name: '비공개 그룹 1',
            description: '첫 번째 비공개 그룹입니다.',
            isPublic: false,
            password: '0000',
          },
          {
            id: 4,
            name: '비공개 그룹 2',
            description: '두 번째 비공개 그룹입니다.',
            isPublic: false,
          },
        ],
      });
    }, 500); // 네트워크 지연을 흉내내기 위한 딜레이
  });
};

// 8. 그룹 공감 (좋아요 기능)
export const likeGroup = (groupId) => {
  return axios.post(`${API_BASE_URL}/api/groups/${groupId}/like`);
};

// 9. 그룹 공개 여부 확인 (공개/비공개 상태 확인)
export const checkGroupIsPublic = (groupId) => {
  return axios.get(`${API_BASE_URL}/api/groups/${groupId}/is-public`);
};
