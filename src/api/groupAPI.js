import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://zogakzip-be-c3c2.onrender.com';

// 1. 그룹 등록 (그룹 생성)
export const createGroup = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/groups`, payload);
    
    // 백엔드에서 받은 응답에서 그룹 ID 추출
    const groupId = response.data?.group?.id; 

    if (groupId) {
      return groupId; // 그룹 ID를 반환
    } else {
      throw new Error('그룹 생성 성공, 그러나 그룹 ID가 응답에 포함되지 않음');
    }

  } catch (error) {
    console.error('Error creating group:', error);
    throw error; // 에러를 다시 던져 호출하는 쪽에서 처리하도록 함
  }
};


{/*// 2. 공개 그룹 목록 조회
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
};*/}

// 2. 공개 그룹 목록 조회
export const fetchGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/groups?isPublic=true`); // 공개 그룹 목록을 가져오는 API 경로
    return response.data.data; // 응답 데이터를 반환 // 페이징 처리된 데이터에서 그룹 목록만 반환
  } catch (error) {
    console.error('Error fetching public groups:', error);
    throw error; // 에러 발생 시 호출하는 쪽에서 처리할 수 있도록 던집니다
  }
};

// 3. 그룹 수정 (그룹 정보 업데이트)
{/*export const updateGroup = async (groupId, groupData) => {
  return axios.put(`https://zogakzip-bmoe.onrender.com/api/groups/${groupId}`, groupData);
};*/}

export const updateGroup = async (groupId, payload) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/groups/${groupId}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' }, // FormData 처리
    });
    return response.data;
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
};

// 4. 그룹 삭제
export const deleteGroup = async (groupId) => {
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

{/*}
// 5. 그룹 상세 정보 조회 (공개 그룹 및 비공개 그룹)
export const fetchGroupById = async (groupId) => {
  return axios.get(`https://zogakzip-bmoe.onrender.com/api/groups/${groupId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching group with ID ${groupId}:`, error);
      throw error;
    });
};*/}

// 6. 비공개 그룹에 접근할 수 있는지 비밀번호 확인
export const verifyGroupPassword = async (groupId, password) => {
  return axios.post(`${API_BASE_URL}/api/groups/${groupId}/verify-password`, { password });
};

// 7. 비공개 그룹 목록 조회
{/*export const fetchPrivateGroups = async () => {
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
};*/}

// 7. 비공개 그룹 목록 조회
export const fetchPrivateGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/groups?isPublic=false`);
    return response.data;
  } catch (error) {
    console.error('Error fetching private groups:', error);
    throw error;
  }
};


// 8. 그룹 공감 (좋아요 기능)
export const likeGroup = (groupId) => {
  return axios.post(`${API_BASE_URL}/api/groups/${groupId}/like`);
};

// 9. 그룹 공개 여부 확인 (공개/비공개 상태 확인)
export const checkGroupIsPublic = async (groupId) => {
  return axios.get(`${API_BASE_URL}/api/groups/${groupId}/is-public`);
};