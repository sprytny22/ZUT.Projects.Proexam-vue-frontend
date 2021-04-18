import axios from 'axios';

export async function getUsers() {
    const response = await axios.get(`/users`);
    return response.data;
}

export async function getUser(id) {
    const {data} = await axios.get(`/user/${id}`);
    return data;
}

export async function addUser(payload) {
    const {data} = await axios.post(`/user`, payload);
    return data;
}

export async function updateUser(payload) {
    const {data} = await axios.post(`/users`, payload);
    return data;
}

export async function deleteUser(id) {
    const {data} = await axios.post(`/user/delete/${id}`);
    return data;
}