import axios from 'axios';

export async function getToken(credentials) {
    const response = await axios.post(`/login_check`, credentials);
    return response.data;
}

export async function getDetails() {
    const response = await axios.get(`/details`);
    return response.data;
}
