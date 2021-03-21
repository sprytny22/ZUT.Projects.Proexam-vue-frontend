import axios from 'axios';

export async function getTests() {
    const response = await axios.get(`/tests`);
    return response.data;
}

export async function addTest(form) {
    const response = await axios.post(`/test`, form);
    return response;
}

// export async function getObjectIcon(iconId) {
//     const response = await axios.get(`/objects/icons/${iconId}`);
//     return response.data;
// } 