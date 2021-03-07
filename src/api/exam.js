import axios from 'axios';

export async function getExams() {
    const response = await axios.get(`/exams`);
    return response.data;
}

export async function createExam(form) {
    const response = await axios.post(`/exam`, form);
    return response;
}

export async function confirmExam(id) {
    const response = await axios.put(`/exam/confirm/${id}`);
    return response;
}

export async function startExam(id) {
    const response = await axios.put(`/exam/start/${id}`);
    return response;
}

