<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item>
                {{currentTime}}
            </el-menu-item>
            <el-menu-item>
                Piotr Klaczkowski
            </el-menu-item>
            <el-menu-item index="2" class="el-menu-right" @click="handleLogout">
                <i class="el-icon-switch-button"></i>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "Navbar",
        data() {
            return {
                currentTime: moment().format('LTS'),
                timer: '',
            }
        },
        methods: {
            handleLogout() {
                this.$store.dispatch('logout');
                this.$message.success('Wylogowano!');
            },
            refreshMoment() {
                this.currentTime = moment().format('LTS');
            }
        },
        created() {
            this.timer = setInterval(this.refreshMoment, 1000)
        }
    }
</script>

<style scoped>
    .el-menu-right{
        float:right;
    }
</style>