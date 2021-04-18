<template>
    <div class="login-page">
        <el-row type="flex" class="row-bg margin-bot-20" justify="center">
            <h1>PROEXAM</h1>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <el-card>
                    <el-form v-show="show" ref="form" :model="form">
                        <el-form-item label="Username/Email">
                            <el-input v-model="form.username" placeholder="Email"></el-input>
                        </el-form-item>
                        <el-form-item label="Hasło">
                            <el-input v-model="form.password" placeholder="Hasło" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox>Zapamiętaj mnie</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="nav-button" @click="onSubmit">Zaloguj</el-button>
                            <el-button type="info" class="nav-button" @click="show = !show">Zajerestruj się</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                loading: false,
                show: false,
            }
        },
        mounted() {
            this.show = !this.show;
        },
        methods: {
            async onSubmit() {
                 try {
                    this.loading = true;

                    await this.$store.dispatch('initToken', this.form);
                    this.$message.success('Zalogowano!');

                     if (this.$router.currentRoute.name !== 'exams') {
                         await this.$router.push('exams');
                     }
                } catch (error) {
                    this.$message.error('Oops, błedne dane logowania.'+ error.message);
                } finally {
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped>
    .login-page {
        font-family: "Lato-Light";
    }
    .margin-bot-20 {
        margin-bottom: 20px;
    }

</style>