import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://zogakzip-be-c3c2.onrender.com';

export const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return axios.post(`${API_BASE_URL}/api/imageFile`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

};