import axios from 'axios';

const API_BASE_URL = 'https://zogakzip-bmoe.onrender.com';

export const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return axios.post('https://zogakzip-bmoe.onrender.com/api/imageFile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

};