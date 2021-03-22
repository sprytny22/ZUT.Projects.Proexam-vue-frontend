<template>
    <div>
        <el-row class="top-buttons">
            <h3>Dodaj pytanie</h3>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form ref="form" :model="form" v-loading.fullscreen.lock="loading">
                    <el-form-item>
                        <el-input v-model="form.category" placeholder="Kategoria"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.content" placeholder="Treść pytania"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-radio v-model="form.type" @change="handleOpen" label="open">Otwarte</el-radio>
                        <el-radio v-model="form.type" @change="handleOpen" label="close">Zamknięte</el-radio>
                    </el-form-item>
                    <el-collapse v-model="form.type">
                        <el-collapse-item name="open">
                            <el-form-item>
                                <el-input v-model="form.a" placeholder="Treść odpowiedzi 'A'"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.b" placeholder="Treść odpowiedzi 'B'"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.c" placeholder="Treść odpowiedzi 'C'"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.d" placeholder="Treść odpowiedzi 'D'"></el-input>
                            </el-form-item>
                            <el-form-item :span="12">
                                <el-select v-model="form.correct" placeholder="Poprawna odpowiedz">
                                    <el-option label="A" value="A"></el-option>
                                    <el-option label="B" value="B"></el-option>
                                    <el-option label="C" value="C"></el-option>
                                    <el-option label="D" value="D"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
                    <el-form-item style="margin-top: 10px;">
                        <el-button type="primary" @click="onSubmit">Dodaj</el-button>
                        <el-button @click="$router.go(-1)" >Wróc</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {addQuestion} from '../../api/question';

    export default {
        name: "QuestionAdd",
        data() {
            return {
                loading: false,
                opened: true,
                form: {
                    type: 'open',
                    content: '',
                    category: '',
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                    correct: '',
                }
            }
        },
        methods: {
            handleOpen(){
                this.opened = !this.opened;
            },
            clearForm() {
                Object.assign(this.form,{
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                    correct: '',
                });
            },
            async onSubmit() {
                this.loading = true;
                try {
                    await addQuestion(this.form);
                    this.$message.success('Poprawnie wysłano pytanie!');
                } catch(error) {
                    this.$message.error('Nie udało sie wysłać formularza.');
                } finally {
                    this.loading = false;
                }

                this.clearForm();
            }
        }
    }
</script>

<style scoped>

</style>