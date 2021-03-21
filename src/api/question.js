import axios from 'axios';

export async function getQuestions() {
    const response = await axios.get(`/questions`);
    console.log(response);
    return response.data;
}

export async function addQuestion(form) {
    const response = await axios.post(`/question`, form);
    return response;
}
