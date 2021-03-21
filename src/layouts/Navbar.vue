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
        computed: {
            currentTime: () => {
                return moment().format('LTS');
            }
        },
        methods: {
            handleLogout() {
                console.log('logout');
                moment()
            }
        }
    }
</script>

<style scoped>
    .el-menu-right{
        float:right;
    }
</style>