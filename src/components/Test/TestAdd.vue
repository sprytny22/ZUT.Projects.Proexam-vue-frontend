<template>
    <div>
        <el-row class="top-buttons">
            <h3>Dodaj test</h3>
        </el-row>
        <el-row>
            <el-col :span="12" v-loading.fullscreen.lock="loading">
                <el-form ref="form" :model="form">
                    <el-form-item>
                        <el-input v-model="form.name" placeholder="Nazwa testu"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-input v-model="form.category" placeholder="Kategoria"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.questions" multiple placeholder="Pytania">
                            <el-option v-for="question in questions"
                                       :key="question.id"
                                       :label="question.content"
                                       :value="question.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="nav-button" @click="onSubmit">Utwórz test</el-button>
                        <el-button class="nav-button">Wróć</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {addTest} from "../../api/test";

    export default {
        name: "testsAdd",
        data() {
            return {
                loading: false,
                form: {
                    name: '',
                    category: '',
                    questions: []
                }
            }
        },
        computed: {
            ...mapGetters({
                questions: 'QUESTIONS'
            }),
        },
        mounted() {
            this.$store.dispatch("GET_QUESTIONS");
        },
        methods: {
            async onSubmit() {
                this.loading = true;

                try {
                    await addTest(this.form);
                    this.$message.success('Poprawnie utworzono test!');
                } catch(error) {
                    this.$message.error('Nie udało sie wysłać formularza.');
                } finally {
                    this.loading = false;
                }

                this.$router.push('tests');
            }
        }
    }
</script>

<style scoped>

</style>