import axios from 'axios';

export async function getQuestions() {
    const {data} = await axios.get(`/questions`);
    return data;
}
