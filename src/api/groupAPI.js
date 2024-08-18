import axios from 'axios';

const API_BASE_URL = 'https://localhost:3000';

// 공개 그룹 목록 가져오기


export const fetchGroups = () => {
    return axios.get(`${API_BASE_URL}/groups`);
};
export const fetchGroupById = (id) => {
    return axios.get(`${API_BASE_URL}/groups/${id}`);
  };
  
  export const createGroup = (groupData) => {
    return axios.post(`${API_BASE_URL}/groups`, groupData);
  };
  
  export const updateGroup = (id, groupData) => {
    return axios.put(`${API_BASE_URL}/groups/${id}`, groupData);
  };