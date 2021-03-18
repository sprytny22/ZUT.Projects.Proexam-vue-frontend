<template>
    <div>
        <el-table
                :data="exams"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="Nazwa"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="Status"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="startDate"
                    label="Data otwarcia"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    label="czas startu"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="czas zamkniecia">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="Operations">
                <template slot-scope="scope">
                    <el-button v-if="enableVisable(scope.$index, 1) && $isGranted('ROLE_EXAMER')" @click="handleConfirm(scope.$index)" type="text" size="small">Potwierdz</el-button>
                    <el-button v-if="enableVisable(scope.$index, 2) && $isGranted('ROLE_EXAMER')" @click="handleStart(scope.$index)" type="text" size="small">Rozpocznij</el-button>
                    <el-button v-if="enableVisable(scope.$index, 3) && $isGranted('ROLE_EXAMER')" @click="handleWatch(scope.$index)" type="text" size="small">Ogladaj</el-button>
                    <el-button v-if="enableVisable(scope.$index, 3) && $isGranted('ROLE_USER')" @click="handleJoin(scope.$index)" type="text" size="small">Dołącz</el-button>
                    <el-button v-if="enableVisable(scope.$index, 4)" @click="handleResult(scope.$index)" type="text" size="small">Zobacz Rezultat</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            enableVisable(index, buttonType) {
                const exam = this.exams[index];
                const type = exam.type;

                if (buttonType === type) {
                    return true
                }

                return false;
            },
            handleConfirm(index) {
                const id = this.exams[index].id;
                this.checkType(index, 2)

                try {
                    this.loading = true;
                    confirmExam(id);

                    this.$message.success('Created!');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.');
                } finally {
                    this.loading = false;
                }

                this.$store.dispatch("GET_EXAMS")
            },
            handleStart(index) {
                const id = this.exams[index].id;
                this.checkType(index, 2)
                // check if user

                try {
                    this.loading = true;
                    startExam(id);

                    this.$message.success('Created!');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.');
                } finally {
                    this.loading = false;
                }

                this.$store.dispatch("GET_EXAMS")
            },
            async handleWatch(index) {
                this.checkType(index, 3)
                const exam = this.exams[index];

                await this.$store.dispatch('START_EXAM', exam.id);
                this.$router.push('watch');
            },
            async handleJoin(index) {
                this.checkType(index, 3)
                const exam = this.exams[index];

                try {
                    await this.$store.dispatch('START_EXAM', exam.id);
                    this.$router.push('main');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.')
                }
            },
            handleResult(index) {
                this.checkType(index, 4)

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
            checkType(index, buttonType) {
                const exam = this.exams[index];
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
</style>