import axios from  'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://zogakzip-be-c3c2.onrender.com';

//1. 배지 목록 조회
export const fetchBadgesByGroupId = (groupId) => {
    return axios.get(`${API_BASE_URL}/api/groups/${groupId}/badges`);
};

//2. 배지 상세 정보 조회
export const fetchBadgeById = (badgeId) => {
    return axios.get(`${API_BASE_URL}/api/badges/${badgeId}`);
  };