<template>
    <div>
        <el-card class="box-card my-box-card" :key="question.content">
            <el-row>
                <h3>{{index+1}}. {{question.content}}</h3>
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
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "QuestionText",
        props: {
            question: null,
            index: Number,
            updateResult: {
                Function
            }
        },
        data () {
            return {
                answer: {
                    answerId: null,
                    type: 'open',
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