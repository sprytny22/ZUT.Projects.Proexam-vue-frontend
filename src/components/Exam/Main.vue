<template>
    <div>
        <el-row>
            <h1>{{examName}}!</h1>
        </el-row>
        <el-row>
            <el-col :span="24" v-for="question in questions" :key="question.answerId">
                <Question
                        v-if="question.type === 'open'"
                        :key="question.answerId"
                        :question="question"
                        :update-result="updateAnswer"
                />
                <QuestionText
                        v-if="question.type === 'close'"
                        :key="question.answerId"
                        :question="question"
                        :update-result="updateAnswer"
                />
            </el-col>
        </el-row>
        <el-row>
            <div id="finish-button">
                <el-button type="primary" @click="onSubmit">Zakoncz egzamin</el-button>
            </div>
            <el-dialog
                    title="Tips"
                    :visible.sync="showCloseDialog"
                    width="30%">
                <span>Czy na pewno chcesz zakończyć egzamin?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showCloseDialog = false">Cancel</el-button>
                    <el-button type="primary" @click="doSubmit">Confirm</el-button>
              </span>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import Question from "./Question";
    import QuestionText from "./QuestionText";
    import {updateResult, closeResult} from "../../api/exam";

    export default {
        name: "Main",
        components: {
            Question,
            QuestionText
        },
        computed: {
            ...mapGetters({
                resultId: 'CURRENT_RESULT_ID',
                questions: 'CURRENT_QUESTIONS',
                examName: 'CURRENT_EXAM_NAME',
                testName: 'CURRENT_TEST_NAME'
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
                showCloseDialog: false,
                fullExam: []
            }
        },
        methods: {
            updateAnswer(answer) {
                const answerId = answer.answerId;
                for (let i = 0; i < this.questions.length; i++) {
                    if (this.fullExam[i].answerId === answerId) {
                        this.fullExam[i].answer = answer.answer;
                    }
                }

                updateResult(this.resultId,this.fullExam);
            },
            initFinalAnswer() {
                this.questions.forEach(question => {
                    this.fullExam.push({
                        answerId: question.answerId,
                        type: question.type,
                        answer: 'None'
                    })
                });
            },
            handleBack() {
                this.showCloseDialog = false;
            },
            onSubmit() {
                this.showCloseDialog = true;
            },
            doSubmit() {
                this.showCloseDialog = false;
                closeResult(this.resultId);

                this.$router.push('exams');
            }
        }
    }
</script>

<style scoped>
#finish-button {
    margin-top: 2em;
}
</style>