<template>
    <div>
        <div v-for="user in users" :key="user.id">
            <watch-card
                :examId="$route.params.id"
                :userId="user.id"
             />
        </div>
        <el-button-group class="switch-page">
            <el-button plain class="nav-button" icon="el-icon-arrow-left"></el-button>
            <el-button plain class="nav-button" ><i class="el-icon-arrow-right"></i></el-button>
        </el-button-group>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
import WatchCard from './WatchCard.vue';

    export default {
        components: { WatchCard },
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