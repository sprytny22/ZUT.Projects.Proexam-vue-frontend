<template>
    <div>
        <el-row>
            <h1>Egzamin testowy!</h1>
        </el-row>
        <el-row>
            <el-col :span="24" v-for="question in questions" :key="question.uuid">
                <Question
                        v-if="question.type === 'close'"
                        :key="question.uuid"
                        :question="question"
                        :update-result="updateAnswer"
                />
                <QuestionText
                        v-if="question.type === 'open'"
                        :key="question.uuid"
                        :question="question"
                        :update-result="updateAnswer"
                />
            </el-col>
        </el-row>
        <el-row>
            <div id="finish-button">
                <el-button type="primary" @click="onSubmit">Zakoncz egzamin</el-button>
            </div>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import Question from "./Question";
    import QuestionText from "./QuestionText";

    export default {
        name: "Main",
        components: {
            Question,
            QuestionText
        },
        computed: {
            ...mapGetters({
                questions: 'EXAM_QUESTIONS',
            })
        },
        created() {
            if (this.questions.length === 0) {
                this.$message.error('Oops, coś poszło nie tak.');
                this.$router.push('exams');
            }

            this.initFinalAnswer();
        },
        data() {
            return {
                fullExam: []
            }
        },
        methods: {
            updateAnswer(answer) {
                const uuid = answer.uuid;
                for (let i = 0; i < this.questions.length; i++) {
                    if (this.fullExam[i].uuid === uuid) {
                        this.fullExam[i].answer = answer.answer;
                    }
                }
            },
            initFinalAnswer() {
                this.questions.forEach(question => {
                    this.fullExam.push({
                        uuid: question.uuid,
                        answer: 'None'
                    })
                });
            },
            onSubmit() {
                console.log(JSON.stringify(this.fullExam));
            }
        }
    }
</script>

<style scoped>
#finish-button {
    margin-top: 2em;
}
</style>