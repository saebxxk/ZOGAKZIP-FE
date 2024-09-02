import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return axios.post('${API_BASE_URL}/api/imageFile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

};