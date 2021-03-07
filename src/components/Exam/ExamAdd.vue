<template>
    <div>
        <el-row class="top-buttons">
            <h3>Dodaj Egzamin</h3>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form ref="form" label-width="120px">
                    <el-form-item label="Nazwa:">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="Data startu:">
                        <el-date-picker v-model="form.start"
                                        type="datetime"
                                        placeholder="Select date and time">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Data konca:">
                        <el-date-picker v-model="form.end"
                                        type="datetime"
                                        placeholder="Select date and time">
                        </el-date-picker>
                    </el-form-item>
<!--                    <el-form-item label="Czas:">-->
<!--                        <el-input v-model="form.time" ></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="Test:">
                        <el-select v-model="form.test" placeholder="Nazwa testu">
                            <el-option v-for="test in tests"
                                       :key="test.id"
                                       :label="test.name"
                                       :value="test.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Użytkownik:">
                        <el-select v-model="form.users" multiple placeholder="Nazwa użytkownika">
                            <el-option v-for="user in users"
                                       :key="user.id"
                                       :label="user.email"
                                       :value="user.id">
                            </el-option>>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">Dodaj</el-button>
                        <el-button>Cancel</el-button>
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
                console.log(this.form);
                try {
                    this.loading = true;
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
