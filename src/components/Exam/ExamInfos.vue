<template>
    <div>
<!--        <el-table-->
<!--                :data="exams"-->
<!--                style="width: 100%">-->
<!--            <el-table-column-->
<!--                    prop="id"-->
<!--                    label="id"-->
<!--                    width="50">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="title"-->
<!--                    label="Nazwa"-->
<!--                    width="150">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="status"-->
<!--                    label="Status"-->
<!--                    width="150">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="startDate"-->
<!--                    label="Data otwarcia"-->
<!--                    width="150">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="startTime"-->
<!--                    label="czas startu"-->
<!--                    width="150">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="endTime"-->
<!--                    label="czas zamkniecia">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    fixed="right"-->
<!--                    label="Operations">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button v-if="enableVisable(scope.$index, 1) && $isGranted('ROLE_EXAMER')" @click="handleConfirm(scope.$index)" type="text" size="small">Potwierdz</el-button>-->
<!--                    <el-button v-if="enableVisable(scope.$index, 2) && $isGranted('ROLE_EXAMER')" @click="handleStart(scope.$index)" type="text" size="small">Rozpocznij</el-button>-->
<!--                    <el-button v-if="enableVisable(scope.$index, 3) && $isGranted('ROLE_EXAMER')" @click="handleWatch(scope.$index)" type="text" size="small">Ogladaj</el-button>-->
<!--                    <el-button v-if="enableVisable(scope.$index, 3) && $isGranted('ROLE_USER')" @click="handleJoin(scope.$index)" type="text" size="small">Dołącz</el-button>-->
<!--                    <el-button v-if="enableVisable(scope.$index, 4)" @click="handleResult(scope.$index)" type="text" size="small">Zobacz Rezultat</el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--        </el-table>-->

<!--        id: item.examId,-->
<!--        title: item.title,-->
<!--        startDate: startDate,-->
<!--        startTime: startTime,-->
<!--        endTime: endTime,-->
<!--        status: status,-->
<!--        type: type-->

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
                        Data otwarcia egzaminu: <b>{{exam.startDate}}/{{exam.startTime}}</b>
                    </el-row>
                    <el-row>
                        Status: {{exam.status}}
                    </el-row>
                    <el-row>
                        Próg zdania: 70%
                    </el-row>
                </el-col>
                <el-col :span="10" align="right">
                    <el-row>
                        <el-button type="success" plain icon="el-icon-check"  v-if="enableVisable(exam, 1) && $isGranted('ROLE_EXAMER')" @click="handleConfirm(exam)"></el-button>
                        <el-button type="primary" plain icon="el-icon-caret-right" v-if="enableVisable(exam, 2) && $isGranted('ROLE_EXAMER')" @click="handleStart(exam)"></el-button>
                        <el-button type="info" plain icon="el-icon-view" v-if="enableVisable(exam, 3) && $isGranted('ROLE_EXAMER')" @click="handleWatch(exam)"></el-button>
                        <el-button type="success" plain icon="el-icon-plus" v-if="enableVisable(exam, 3) && $isGranted('ROLE_USER')" @click="handleJoin(exam)"></el-button>
                        <el-button type="info" plain icon="el-icon-document-checked" v-if="enableVisable(exam, 4)" @click="handleResult(exam)"></el-button>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
        <el-button-group class="switch-page">
            <el-button plain class="nav-button" icon="el-icon-arrow-left"></el-button>
            <el-button plain class="nav-button" ><i class="el-icon-arrow-right"></i></el-button>
        </el-button-group>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { confirmExam, startExam } from '../../api/exam';

    export default {
        name: "ExamInfos",
        computed: {
            ...mapActions({
                isGranted: 'isGranted'
            }),
            ...mapGetters({
                exams: 'EXAMS'
            }),
        },
        methods: {
            enableVisable(exam, buttonType) {
                const type = exam.type;

                if (buttonType === type) {
                    return true
                }

                return false;
            },
            handleConfirm(exam) {
                this.checkType(exam, 2)

                try {
                    this.loading = true;
                    confirmExam(exam.id);

                    this.$message.success('Created!');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.');
                } finally {
                    this.loading = false;
                }

                this.$store.dispatch("GET_EXAMS")
            },
            handleStart(exam) {
                this.checkType(exam, 2)
                // check if user

                try {
                    this.loading = true;
                    startExam(exam.id);

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

                await this.$store.dispatch('START_EXAM', exam.id);
                this.$router.push('watch');
            },
            async handleJoin(exam) {
                this.checkType(exam, 3)

                try {
                    await this.$store.dispatch('START_EXAM', exam.id);
                    this.$router.push('main');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.')
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
            }
        },
        mounted () {
            this.$store.dispatch("GET_EXAMS");
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