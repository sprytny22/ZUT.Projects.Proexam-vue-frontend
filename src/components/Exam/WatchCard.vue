<template>
    <div>
        <el-card class="box-card my-box-card">
            <el-row>
                <el-col :span="2" align="left" >
                    <el-row>
                        <h4>{{user.id}}</h4>
                    </el-row>
                </el-col>
                <el-col :span="4" align="left" >
                    <el-row>
                        <h4>{{user.email}}</h4>
                    </el-row>
                </el-col>
                <el-col :span="4" align="left" >
                    <el-row>
                        <h4>{{user.name}} {{user.surname}}</h4>
                    </el-row>
                </el-col>
                <el-col :span="4" align="right" >
                    <el-row> 
                        <h4 v-if="isEnding" class="end">Zakończony</h4>
                        <h4 v-else-if="isStarted" class="running">Rozpoczęty</h4>
                        <h4 v-else class="not-running">Nierozpoczęty</h4>
                    </el-row>
                </el-col>
                <el-col :span="4" align="right" >
                    <el-row>
                        <pulse-loader :loading="isChanging" :color="color" style="margin-top: 20px;"></pulse-loader>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-collapse>
                    <el-collapse-item title="Stan Egzaminu" name="1" >
                        <div v-if="isEnding" > Użytkownik zakonćzył egzamin.</div>
                        <div v-else-if="!isStarted" > Użytkownik nie rozpoczął jeszcze egzaminu.</div>
                        <div v-else>
                            <div v-for="(answer, index) in answers" :key="answer.answerId">
                                <Answer
                                    :key="answer.answerId"
                                    :index="index"
                                    :answer="answer"
                                    :type="answer.type"
                                />
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import { watchExam } from '../../api/exam';
import Answer from '../Exam/Answer';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: "WatchCard",
    components: {
        Answer,
        PulseLoader
    },
    props: {
        userId: Number,
        examId: Number,
    },
    data() {
        return {
            loading: false,
            answers: [],
            eventSource: null,
            name: null,
            user: null,
            color: '#3AB982',
            statusInit: true,
            isChanging: false,
            isRunning: false,
            isStarted: false,
            isEnding: false,
            isLooping: true
        }
    },
    mounted() {
        this.watch();
    },
    destroyed() {
        this.isLooping = false;
    },
    methods: {
        async watch() {
            const {
                userId,
                examId,
            } = this;

            let status = 'init';
            try {
                const data = await watchExam(userId, examId);
                if (data.data.status === 'ok') {
                    this.isStarted = true;
                    status = data.data.status;
                    this.answers = data.data.questions;

                    const resultId = data.data.result; 
                    // const hubUrl = data.headers["link"].match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];
                    const hubUrl = "http://php.docker.localhost:9090/.well-known/mercure";// hehe
                    let url = new URL(hubUrl);
                    url.searchParams.append('topic', `result/${resultId}`);

                    this.eventSource = new EventSource(url, {
                        withCredentials: true,
                    });

                    this.eventSource.onmessage = (event) => {
                        let parse = JSON.parse(event.data);

                        if (parse.status === 'end') {
                            console.log("WESZLO!");
                            this.isEnding = true;
                            this.eventSource.close();

                            return;
                        }

                        this.updateAnswer(parse);
                    }
                } else if (data.data.status === 'closed') {

                    this.name = data.data.exam;
                    this.user = data.data.user;

                    this.isEnding = true;

                    return;
                }

                this.name = data.data.exam;
                this.user = data.data.user;

            } catch(error) {
                this.$message.error('Użytkownik jeszcze nie rozpoczął egzaminu!');
                this.$router.push({
                    name: 'watchList',
                    params: {
                        id: examId
                    }
                });

                return;
            }

            if (status !== 'ok' && this.isLooping) {
                setTimeout(() => {
                    this.watch();
                }, 3000);
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
            
            this.changingTimeOut();
        },
        changingTimeOut() {
            this.isStarted = true;
            this.isChanging = true;

            setTimeout(() => {
                this.isChanging = false;
            }, 3000);
        }
    },
}
</script>
<style>
    .running {
        color: green;
    }
    .not-running {
        color:orange;
    
    }
    .end {
        color: red;
    }
    
</style>

