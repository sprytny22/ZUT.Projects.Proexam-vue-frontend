<template>
    <div v-if="$isGranted('ROLE_ADMIN')">
        <el-row class="top-buttons">
            <h3>Dodaj Użytkownika</h3>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form ref="form">
                    <el-form-item>
                        <el-input v-model="form.email" placeholder="Email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.name" placeholder="Imie"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.surname" placeholder="Nazwisko"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.pesel" placeholder="Pesel"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.password" placeholder="Hasło" show-password></el-input>
                    </el-form-item>
                    <el-select v-model="form.role" placeholder="Rola w systemie">
                        <el-option v-for="(role, index) in roles"
                                    :key="index"
                                    :label="role"
                                    :value="index">
                        </el-option>
                    </el-select>
                    <el-form-item>
                        <el-button type="primary" class="nav-button" style="margin-top: 20px;" @click="onSubmit">Dodaj</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { addUser } from '../../api/user'

export default {
    name: "Admin",
    data() {
        return {
            form: {
                email: '',
                name: '',
                surname: '',
                pesel: '',
                password: '',
                role: ''
            },
            roles: {
                1: 'ROLE_USER',
                2: 'ROLE_EXAMER',
                3: 'ROLE_ADMIN',
            }
        }
    },
    methods: {
        onSubmit() {
                this.form.role = parseInt(this.form.role, 10)
        
                try {
                    addUser(this.form);
                    this.$message.success('Utworzono!');
                } catch (error) {
                    this.$message.error('Oops, coś poszło nie tak.');
                }

                this.$router.push('admin');
        }
    }
}
</script>
<style scoped>
    
</style>