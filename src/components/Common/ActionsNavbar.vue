<template>
    <div>
        <el-row >
            <el-col :span="20">
                <router-link :to="{name: 'examsAdd'}" v-if="$route.name === 'exams'">
                    <el-button plain class="nav-button"><a>Nowy egzamin</a></el-button>
                </router-link>

                <router-link :to="{name: 'tests'}" v-if="$route.name === 'exams' || $route.name === 'examsAdd'">
                    <el-button plain class="nav-button">Testy</el-button>
                </router-link>

                <router-link :to="{name: 'testAdd'}" v-if="$route.name === 'tests' || $route.name === 'testAdd'">
                    <el-button plain class="nav-button">Nowy test</el-button>
                </router-link>

                <router-link :to="{name: 'questions'}" v-if="$route.name === 'tests' || $route.name === 'questionAdd' || $route.name === 'testAdd'">
                    <el-button plain class="nav-button">Pytania</el-button>
                </router-link>

                <router-link :to="{name: 'questionAdd'}" v-if="$route.name === 'tests' || $route.name === 'questions' || $route.name === 'testAdd'">
                    <el-button plain class="nav-button">Nowe pytanie</el-button>
                </router-link>
            </el-col>
            <el-col :span="4" class="nav-buttons">
                    <el-button plain class="nav-button" icon="el-icon-loading" v-if="loading"></el-button>
                    <el-button plain class="nav-button" icon="el-icon-refresh-right" @click="refreshExams" v-else></el-button>
                    <el-button plain class="nav-button" @click="$router.go(-1)">Wróć</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "ActionsNavbar",
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async refreshExams() {
            this.loading = true;
            await this.$store.dispatch("GET_EXAMS");
            await this.sleep(400);
            this.loading = false;
        },
        sleep(time){
            return new Promise((resolve) => setTimeout(resolve, time));
        }

    }
}
</script>

<style>
    .nav-button{
        font-size: 13px;
        margin-right: 5px;
        font-weight: normal;
    }
    .nav-buttons {
        float: right;
        text-align: right;
    }

</style>