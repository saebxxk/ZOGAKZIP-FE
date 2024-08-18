import axios from 'axios';

const API_BASE_URL = 'https://localhost:3000';

// 공개 그룹 목록 가져오기
export const fetchPublicGroups = () => {
    return axios.get(`${API_BASE_URL}/groups`, {
        params: {
            isPublic: true
        }
    });
};