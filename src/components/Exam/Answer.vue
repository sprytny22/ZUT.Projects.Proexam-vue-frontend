<template>
    <div>
        <el-card class="box-card my-box-card" :key="answer.answerId">
            <el-row>
                <h3>{{index + 1}}. {{answer.content}}</h3>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-row v-if="type === 'close'">
                        <el-row>
                            <el-col :span="1"><el-checkbox v-model="checkboxMap.A" /></el-col>
                            <el-col :span="20">A: {{answer.A}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="1"><el-checkbox v-model="checkboxMap.B" /></el-col>
                            <el-col :span="20">B: {{answer.B}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="1"><el-checkbox v-model="checkboxMap.C" /></el-col>
                            <el-col :span="20">C: {{answer.C}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="1"><el-checkbox v-model="checkboxMap.D" /></el-col>
                            <el-col :span="20">D: {{answer.D}}</el-col>
                        </el-row>
                    </el-row>
                    <el-row v-else>
                        <el-col :span="20">
                            <el-input
                                type="textarea"
                                :rows="2"
                                v-model="openAnswer"
                                placeholder="Odpowiedz na pytanie"
                            />
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<!--<el-card class="box-card my-box-card" v-for="exam in exams" :key="exam.id">-->
<!--    <el-row>-->
<!--        <el-col :span="2" align="left" >-->
<!--            <el-row>-->
<!--                <h4>{{exam.id}}</h4>-->
<!--            </el-row>-->
<!--        </el-col>-->
<!--    </el-row>-->
<!--</el-card>-->

<script>
    export default {
        name: "Question",
        props: {
            index: Number,
            answer: Object,
            type: String
        },
        data() {
            return {
                openAnswer: "Oczekiwanie",
                checkboxMap: {
                    A: false,
                    B: false,
                    C: false,
                    D: false
                }
            }
        },
        methods: {
            update() {
                const tmpMap = {
                    A: false,
                    B: false,
                    C: false,
                    D: false
                };

                if (this.answer.type === 'open') {
                    this.openAnswer = this.answer.answerData;
                    return;
                }

                if (this.answer.answerData === null) {
                    this.checkboxMap = Object.assign(this.checkboxMap, tmpMap);
                    return;
                }

                const str = this.answer.answerData;
                if (str === "" || str === undefined) {
                    this.checkboxMap = Object.assign(this.checkboxMap, tmpMap);
                    return;
                }

                const answers = str.split(",");

                answers.forEach(answer => {
                    if (answer === 'A') {
                        tmpMap.A = true;
                    }

                    if (answer === 'B') {
                        tmpMap.B = true;
                    }

                    if (answer === 'C') {
                        tmpMap.C = true;
                    }

                    if (answer === 'D') {
                        tmpMap.D = true;
                    }
                });

                this.checkboxMap = Object.assign(this.checkboxMap, tmpMap);
            }
        },
        watch: {
            answer: {
                deep: true,
                immediate: true,
                handler () {
                    this.update();
                }
            }
        }
    }
</script>

<style scoped>

</style>