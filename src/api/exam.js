import axios from 'axios';

export async function getExams() {
    const response = await axios.get(`/exams`);
    return response.data;
}

export async function createExam(form) {
    const response = await axios.post(`/exam`, form);
    return response;
}