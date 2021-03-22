<template>
    <div>
        <el-card class="box-card my-box-card" v-for="test in tests" :key="test.id">
            <el-row>
                <el-col :span="2" align="left" >
                    <el-row>
                        <h4>{{test.id}}</h4>
                    </el-row>
                </el-col>
                <el-col :span="22">
                    <el-row>
                        Nazwa testu: {{test.name}}
                    </el-row>
                    <el-row>
                        Kategoria: {{test.category}}
                    </el-row>
                    <el-row>
                        <el-collapse>
                            <el-collapse-item title="Pytania" name="1">
                                <div v-for="(question,index) in test.questions" :key="question.uuid">
                                    {{index+1}}: {{question.content}} : <b>{{question.category}}</b>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </el-row>
                </el-col>
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
        name: "Tests.vue",
        computed: {
            ...mapGetters({
                tests: 'TESTS'
            }),
        },
        mounted() {
            this.$store.dispatch("GET_TESTS");
            this.$store.dispatch("GET_QUESTIONS");
        }
    }
</script>

<style scoped>

</style>