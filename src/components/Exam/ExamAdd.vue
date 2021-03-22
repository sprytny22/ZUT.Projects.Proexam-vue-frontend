<template>
    <div>
        <el-row class="top-buttons">
            <h3>Dodaj Egzamin</h3>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form ref="form">
                    <el-form-item>
                        <el-input v-model="form.title" placeholder="Nazwa egzaminu"></el-input>
                    </el-form-item>
                    <el-form-item label="Data startu:">
                        <el-date-picker v-model="form.start"
                                        type="datetime"
                                        placeholder="Select date and time">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Czas: (w minutach)">
                        <el-input v-model="form.time"></el-input>
                    </el-form-item>
                    <el-form-item label="Próg zdania: (w procentach)">
                        <el-input v-model="form.pass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.test" placeholder="Test">
                            <el-option v-for="test in tests"
                                       :key="test.id"
                                       :label="test.name"
                                       :value="test.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.users" multiple placeholder="Użytkownicy">
                            <el-option v-for="user in users"
                                       :key="user.id"
                                       :label="user.email"
                                       :value="user.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="nav-button" @click="onSubmit">Dodaj</el-button>
                        <el-button class="nav-button">Cancel</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { createExam } from '../../api/exam';

    export default {
        name: "ExamAdd",
        computed: {
            ...mapGetters({
                tests: 'TESTS',
                users: 'USERS'
            })
        },
        data () {
            return {
                form: {
                    title: '',
                    start: '',
                    end: '',
                    test: '',
                    pass: 33,
                    time: 0,
                    users: [],
                },
                loading: false
            }
        },
        mounted () {
            this.$store.dispatch("GET_TESTS")
            this.$store.dispatch("GET_USERS")
        },
        methods: {
            onSubmit() {
                this.loading = true;
                this.form.time = parseInt(this.form.time, 10)
                this.form.pass = parseInt(this.form.pass, 10)

                try {
                    createExam(this.form);
                    this.$message.success('Created!');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.');
                } finally {
                    this.loading = false;
                }

                this.$router.push('exams');
            }
        }
    }
</script>

<style scoped>

</style>
