import { getExams, joinExam, watchList, getResults } from '../../api/exam';
import { fixExamData } from '../../helpers'

export default {
    state: {
        exams: [],
        currentResultId: null,
        currentExamName: null,
        currentTestName: null,
        results: [],
        questions: [],

        watchExamUsers: null
    },
    getters: {
        EXAMS: state => fixExamData(state.exams),
        RESULTS: state => state.results,
        CURRENT_RESULT_ID: state => state.currentResultId,
        CURRENT_EXAM_NAME: state => state.currentExamName,
        CURRENT_TEST_NAME: state => state.currentTestName,
        CURRENT_QUESTIONS: state => state.questions,
        WATCH_EXAM_USERS: state => state.watchExamUsers
    },
    mutations: {
        SET_EXAMS(state, payload) {
            state.exams = payload;
        },
        SET_RESULTS(state, payload) {
            state.results = payload;
        },
        SET_CURRENT_EXAM_NAME(state, payload) {
            state.currentExamName = payload;
        },
        SET_CURRENT_TEST_NAME(state, payload) {
            state.currentTestName = payload;
        },
        SET_CURRENT_QUESTIONS(state, payload) {
            state.questions = payload;
        },
        SET_CURRENT_RESULT(state, payload) {
            state.currentResultId = payload;
        },
        SET_WATCH_EXAM_USERS(state, payload) {
            state.watchExamUsers = payload;
        }
    },
    actions: {
        async GET_EXAMS({commit}) {
            const exams = await getExams();

            commit('SET_EXAMS', exams)
        },
        async GET_RESULTS({commit}) {
            const results = await getResults();

            commit('SET_RESULTS', results);
        },
        async START_EXAM({commit}, examId) {
            const openedExam = await joinExam(examId);

            if (openedExam === undefined) {
                throw Error('something goes wrong');
            }

            commit('SET_CURRENT_RESULT', openedExam.result);
            commit('SET_CURRENT_EXAM_NAME', openedExam.exam);
            commit('SET_CURRENT_TEST_NAME', openedExam.test);
            commit('SET_CURRENT_QUESTIONS', openedExam.questions);
        },
        async GET_WATCH_EXAM_USERS({commit}, examId) {
            const users = await watchList(examId);

            console.log(users);
            commit('SET_WATCH_EXAM_USERS', users.users);
        }
    }
}