<template>
    <div>
        <el-card class="box-card my-box-card" v-for="question in questions" :key="question.id">
            <el-row>
                <el-col :span="2" align="left" >
                    <el-row>
                        <h4>{{question.id}}</h4>
                    </el-row>
                </el-col>
                <el-col :span="22">
                    <el-row>
                        Treść pytania: {{question.content}}
                    </el-row>
                    <el-row>
                        Kategoria: {{question.category}}
                    </el-row>
                    <el-row>
                        Typ: {{question.type === 'open' ? 'Otwarte' : 'Zamkniete'}}
                    </el-row>
                    <el-row>
                        <el-collapse>
                            <el-collapse-item title="Odpowiedzi" name="1">
                                <div>A: {{question.a}}</div>
                                <div>B: {{question.b}}</div>
                                <div>C: {{question.c}}</div>
                                <div>D: {{question.d}}</div>
                                <div>Poprawna: {{question.correct}}</div>
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
    import {mapGetters} from 'vuex';
    export default {
        name: "Questions",
        computed: {
            ...mapGetters({
                questions: 'QUESTIONS',
            })
        },
        mounted() {
            this.$store.dispatch("GET_QUESTIONS");
        }
    }
</script>

<style scoped>

</style>