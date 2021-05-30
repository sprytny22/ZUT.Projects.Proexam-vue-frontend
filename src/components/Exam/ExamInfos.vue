<template>
    <div v-loading.fullscreen.lock="loading">
        <el-tabs type="border-card">
            <el-tab-pane label="Egzaminy">
                <el-card class="box-card my-box-card" v-for="exam in exams" :key="exam.id">
                    <el-row>
                        <el-col :span="2" align="left" >
                            <el-row>
                                <h4>{{exam.id}}</h4>
                            </el-row>
                        </el-col>
                        <el-col :span="10">
                            <el-row>
                                {{exam.title}}
                            </el-row>
                            <el-row>
                                Data otwarcia egzaminu: {{exam.startDate}}/{{exam.startTime}}
                            </el-row>
                            <el-row>
                                <span>Status:</span>
                                <span v-bind:style="statusColour(exam.status)"><b style="margin-left: 10px;">{{exam.status}}</b></span>
                            </el-row>
                            <el-row>
                                Próg zdania: {{exam.pass}}%
                            </el-row>
                            <br/>
                            <el-row>
                                <b>Czas: {{exam.time}} minut</b>
                            </el-row>
                        </el-col>
                        <el-col :span="10" align="right">
                            <el-row>
                                <el-button type="success" plain icon="el-icon-check"  v-if="enableVisable(exam, 1) && $isGranted('ROLE_EXAMER')" @click="handleConfirm(exam)"></el-button>
                                <el-button type="primary" plain icon="el-icon-caret-right" v-if="enableVisable(exam, 2) && $isGranted('ROLE_EXAMER')" @click="handleStart(exam)"></el-button>
                                <el-button type="info" plain icon="el-icon-view" v-if="enableVisable(exam, 3) && $isGranted('ROLE_EXAMER')" @click="handleWatch(exam)"></el-button>
                                <el-button type="success" plain icon="el-icon-plus" v-if="enableVisable(exam, 3) && $isGranted('ROLE_USER')" @click="handleJoin(exam)"></el-button>
                                <el-button type="info" plain icon="el-icon-document-checked" v-if="enableVisable(exam, 4)" @click="handleResult(exam)"></el-button>
                                <el-button type="warning" plain icon="el-icon-minus" v-if="$isGranted('ROLE_EXAMER')" @click="handleArchive(exam)"></el-button>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
                <el-button-group class="switch-page">
                    <el-button plain class="nav-button" icon="el-icon-arrow-left"></el-button>
                    <el-button plain class="nav-button" ><i class="el-icon-arrow-right"></i></el-button>
                </el-button-group>
            </el-tab-pane>
            <el-tab-pane label="Rezultaty">
                <el-card class="box-card my-box-card" v-for="(result,index) in results" :key="index">
                    <el-row>
                        <el-col :span="20">
                            <h4>{{index+1}}. {{result.examName}}</h4>
                        </el-col>
                        <el-col :span="4" >
                            <bounce-loader v-if="result.suspect" :loading="true" :color="'#ff0000'" :size="'1px'"></bounce-loader>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            Test: {{result.testName}}
                        </el-col>
                        <el-col :span="4">
                            <div>
                                <el-button type="info" plain icon="el-icon-document-checked" v-if="result.passed && result.status !== 'close_marked' && $isGranted('ROLE_EXAMER')" @click="onClickResult(result.id)"></el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            {{result.fullname}}
                        </el-col>
                        <el-col :span="4">
                            Liczba pytań: {{result.numberOfAnswers}}
                        </el-col>
                        <el-col :span="4">
                            Wynik: {{result.pass}}/{{result.toPass}} (%)
                        </el-col>
                        <el-col :span="4">
                            <div v-if="result.passed && result.status === 'close_marked'">
                                <span style="color: darkgreen;">Zaliczony.</span>
                            </div>
                            <div v-if="result.passed && result.status !== 'close_marked'">
                                <span style="color: darkgoldenrod;">Do sprawdzenia.</span>
                            </div>
                            <div v-if="!result.passed">
                                <span style="color: darkred;">Niezaliczony.</span>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { confirmExam, startExam, archiveExam } from '../../api/exam';
    import BounceLoader from 'vue-spinner/src/BounceLoader.vue'


    export default {
        name: "ExamInfos",
        components: {
            BounceLoader
        },
        computed: {
            ...mapActions({
                isGranted: 'isGranted'
            }),
            ...mapGetters({
                exams: 'EXAMS',
                results: 'RESULTS'
            }),
        },
        data() {
            return {
                loading: false,
                isSuspect: false,
            }
        },
        methods: {
            enableVisable(exam, buttonType) {
                const type = exam.type;

                if (buttonType === type) {
                    return true
                }

                return false;
            },
            async handleConfirm(exam) {
                this.checkType(exam, 1)

                try {
                    this.loading = true;
                    await confirmExam(exam.id);

                    this.$message.success('Created!');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.'+error.message);
                } finally {
                    this.loading = false;
                }

                this.$store.dispatch("GET_EXAMS")
            },
            async handleStart(exam) {
                this.checkType(exam, 2)
                // check if user

                try {
                    this.loading = true;
                    await startExam(exam.id);

                    this.$message.success('Created!');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.');
                } finally {
                    this.loading = false;
                }

                this.$store.dispatch("GET_EXAMS")
            },
            async handleWatch(exam) {
                this.checkType(exam, 3);

                await this.$store.dispatch('GET_WATCH_EXAM_USERS', exam.id);
                this.$router.push({
                    name: 'watchList',
                    params: {
                        id: exam.id
                    }
                });

            },
            async handleJoin(exam) {
                this.checkType(exam, 3)

                try {
                    await this.$store.dispatch('START_EXAM', exam.id);
                    this.$router.push('main');
                } catch (error) {
                    this.$message.error('Nie można dołączyć do egzaminu.')
                }
            },
            handleResult(exam) {
                this.checkType(exam, 4)

                try {
                    this.loading = true;

                    this.$message.success('Created!');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.');
                } finally {
                    this.loading = false;
                }

                this.$store.dispatch("GET_EXAMS")
            },
            checkType(exam, buttonType) {
                const type = exam.type;

                if (type !== buttonType) {
                    this.$message.error('Nie mozna potwierdzic tego egzaminu!');
                }
            },
            statusColour(status) {
                switch (status) {
                    case 'Nie potwierdzony':
                        return 'color: red;';
                    case 'Potwierdzony':
                        return 'color: green;';
                    case 'Trwa':
                        return 'color: orange;';
                    case 'Zakończony':
                        return 'color: black;';
                }
            },
            async handleArchive(exam) {
                try {
                    this.loading = true;

                    await archiveExam(exam.id);
                    this.$message.success('Archizowano egzamin!');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.');
                } finally {
                    this.loading = false;
                }

                this.$store.dispatch("GET_EXAMS")
            },
            onClickResult(id) {
                console.log(id);
                this.$router.push({
                    name: 'review',
                    params: {
                        id: id
                    }
                });
            }
        },
        mounted () {
             this.$store.dispatch("GET_EXAMS");
             this.$store.dispatch("GET_RESULTS");
        }
    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
    .exam-card-col {
        margin-top: 20px;
        margin-left: 20px;
    }

    .my-box-card {
        margin-top: 15px;
    }

    .switch-page {
        margin-top: 15px;
    }
</style>
