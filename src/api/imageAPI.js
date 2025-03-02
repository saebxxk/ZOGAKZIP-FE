import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://zogakzip-be-c3c2.onrender.com';

{/*export const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return axios.post(`${API_BASE_URL}/api/imageFile`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

};*/}

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/imageFile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // 백엔드 응답 구조에 맞게 imageUrl 추출
        return response.data.imageUrl; // imageUrl을 직접 반환
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
};

