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
                    v-model="answerData"
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
                    uuid: null,
                    answerData: ''
                }
            }
        },
        methods: {
            handleChangedAnswer(data) {
                Object.assign(this.answer, {
                    uuid: this.question.uuid,
                    answer: data
                });

                this.updateResult(this.answer);
            }
        }
    }
</script>

<style scoped>

</style>