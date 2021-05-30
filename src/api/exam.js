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
    const response = await axios.get(`/exam/start/${id}`);
    return response.data;
}

export async function watchList(id) {
    const response = await axios.get(`/exam/watch-user/${id}`);
    return response.data;
}

export async function joinExam(id) {
    const response = await axios.get(`/exam/join/${id}`);
    return response.data;
}

export async function watchExam(userId, examId) {
    const response = await axios.get(`/exam/watch/${examId}/user/${userId}`);
    return response;
}

export async function updateResult(id, data) {
    const response = await axios.post(`/exam/result/${id}`, data);
    return response.data;
}

export async function getResults() {
    const response = await axios.get(`/results`);
    return response.data;
}

export async function closeResult(id) {
    const response = await axios.get(`/exam/close/${id}`);
    return response.data;
}

export async function archiveExam(id) {
    const response = await axios.get(`/exam/archive/${id}`);
    return response.data;
}

export async function getReviewAnswers(resultId) {
    const response = await axios.get(`/exam/review/${resultId}`);
    return response.data;
}

export async function sendReview(resultId, payload) {
    const response = await axios.post(`/exam/review/${resultId}`, payload);
    return response.data;
}

// sendReview

// getReviewAnswers


