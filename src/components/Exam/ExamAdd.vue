<template>
    <div>
        <el-row class="top-buttons">
            <h3>Dodaj Egzamin</h3>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form ref="form" label-width="120px">
                    <el-form-item label="Nazwa:">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Data startu:">
                        <el-date-picker v-model="form.start"
                                        type="datetime"
                                        placeholder="Select date and time">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Czas:">
                        <el-input v-model="form.time" ></el-input>
                    </el-form-item>
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
                        <el-select v-model="form.users" placeholder="Nazwa użytkownika">
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
    import { mapGetters, mapActions } from 'vuex';
    import { createExam } from '../../api/exam';

    export default {
        name: "ExamAdd",
        computed: {
            ...mapActions({
                submitExam: 'SET_EXAMS'
            }),
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
                    time: '',
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
            async onSubmit() {
                console.log(this.form);
                try {
                    this.loading = true;
                    await createExam(this.form);

                    this.$message({
                        message: 'Congrats, this is a success message.',
                        type: 'success'
                    });
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.');
                    //throw new Error('View name is required!');
                } finally {
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>
