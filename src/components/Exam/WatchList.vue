<template>
    <div>
        <el-card class="box-card my-box-card" v-for="user in users" :key="user.id">
            <el-row>
                <el-col :span="2" align="left" >
                    <el-row>
                        <h4>{{user.id}}</h4>
                    </el-row>
                </el-col>
                <el-col :span="4" align="left" >
                    <el-row>
                        <h4>{{user.email}}</h4>
                    </el-row>
                </el-col>
                <el-button plain class="nav-button" @click="$router.push({name: 'watch', params: {examId: $route.params.id, userId: user.id }})">Ogladaj</el-button>
            </el-row>
        </el-card>
        <el-button-group class="switch-page">
            <el-button plain class="nav-button" icon="el-icon-arrow-left"></el-button>
            <el-button plain class="nav-button" ><i class="el-icon-arrow-right"></i></el-button>
        </el-button-group>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "WatchList",
        computed: {
            ...mapGetters({
                users: 'WATCH_EXAM_USERS'
            }),
        },
        data() {
          return {
              eve: null
          }
        },
    }
</script>

<style scoped>

</style>