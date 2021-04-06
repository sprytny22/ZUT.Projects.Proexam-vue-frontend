<template>
    <div>
        <el-row>
            <el-col :span="12"><h3>{{name}}</h3></el-col>
            <el-col :span="6"><h3>Imie i nazwisko</h3></el-col>
            <el-col :span="6"><h3>Czas</h3></el-col>
        </el-row>
        <el-row>
            <el-col :span="24" v-for="(answer, index) in answers" :key="answer.answerId">
                <Answer
                        :key="answer.answerId"
                        :index="index"
                        :answer="answer"
                        :type="answer.type"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { watchExam } from '../../api/exam';
    import Answer from '../Exam/Answer';

    export default {
        name: "Watch",
        data() {
            return {
                eventSource: null,
                answers: null,
                name: null
            }
        },
        components: {
            Answer
        },
        mounted() {
            this.watch()
        },
        methods: {
            async watch() {
                const userId = this.$route.params.userId;
                const examId = this.$route.params.examId;

                try {
                    const data = await watchExam(userId, examId);

                    this.answers = data.data.questions;
                    this.name = data.data.exam;
                    console.log(data.data);

                    const resultId = data.data.result;
                    // const hubUrl = data.headers["link"].match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];
                    const hubUrl = "http://php.docker.localhost:9090/.well-known/mercure";// hehe
                    let url = new URL(hubUrl);
                    url.searchParams.append('topic', `result/${resultId}`);

                    this.eventSource = new EventSource(url, {
                        withCredentials: true,
                    });

                    this.eventSource.onmessage = (event) => {
                        this.updateAnswer(JSON.parse(event.data));
                    }

                } catch(error) {
                    this.$message.error('Użytkownik jeszcze nie rozpoczął egzaminu!');
                    this.$router.push({
                        name: 'watchList',
                        params: {
                            id: examId
                        }
                    });
                }

            },
            updateAnswer(data) {
                const {
                    answers
                } = this;

                if (answers === null) return;
                if (answers.length !== data.data.length) {
                    this.$message.error('Oops, coś poszło nie tak z dlugoscia.');
                    return;
                }

                for (let i = 0; i < answers.length; i++) {
                    if (answers[i].type !== data.data[i].type) {
                        this.$message.error('Oops, coś poszło nie tak z typem');
                        return;
                    }

                    let tmp = answers[i];
                    tmp.answerData = data.data[i].answer;

                    this.$set(answers, i, tmp);
                }
            },
        }
    }
</script>

<style scoped>

</style>