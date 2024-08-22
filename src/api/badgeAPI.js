import axios from  'axios';

const API_BASE_URL = 'http://localhost:3000';

//1. 배지 목록 조회
export const fetchBadgesByGroupId = (groupId) => {
    return axios.get(`${API_BASE_URL}/api/groups/${groupId}/badges`);
};

//2. 배지 상세 정보 조회
export const fetchBadgeById = (badgeId) => {
    return axios.get(`${API_BASE_URL}/api/badges/${badgeId}`);
  };