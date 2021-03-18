<template>
    <div>
        <el-row>
            <h3>{{question.content}}</h3>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="Odpowiedz na pytanie"
                    v-model="answer.answerData"
                    @change="handleChangedAnswer"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "QuestionText",
        props: {
            question: null,
            updateResult: {
                Function
            }
        },
        data () {
            return {
                answer: {
                    answerId: null,
                    type: 'close',
                    answerData: ''
                }
            }
        },
        methods: {
            handleChangedAnswer(data) {
                Object.assign(this.answer, {
                    answerId: this.question.answerId,
                    type: this.question.type,
                    answer: data
                });

                this.updateResult(this.answer);
            }
        }
    }
</script>

<style scoped>

</style>