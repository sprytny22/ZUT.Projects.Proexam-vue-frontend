<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Username/Email">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Log-in</el-button>
            </el-form-item>
        </el-form>
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
                loading: false
            }
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

</style>