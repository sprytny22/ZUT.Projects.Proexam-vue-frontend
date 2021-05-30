<template>
    <div>
        <el-row>
            <el-col :span="20">
                <h4>{{user.name}} {{user.surname}} PESEL: {{user.pesel}}</h4>
            </el-col>
            <el-col :span="2">
                <h4 v-if="suspect" style="color: red;">Podejrzany</h4>
            </el-col>
            <el-col :span="2">
                <bounce-loader v-if="suspect" :loading="loading" :color="'#ff0000'"></bounce-loader>
            </el-col>
        </el-row>
        <el-card>
            <el-collapse>
                <el-collapse-item title="Wyświetl logi egzaminu" name="1">
                    <div v-for="(log,index) in logs" :key="index">
                        <div>{{index+1}}. zmieniono odpowiedz z {{log.from}} na {{log.to}}</div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <el-card class="box-card my-box-card" v-for="(result,index) in results" :key="index">
             <el-row>
                <el-col :span="12">
                    Pytanie: {{result.title}}
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
                <el-col :span="12">
                    <textarea v-model="result.out">
                    </textarea>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <div v-if="lock[index]">
                            <el-button type="success" plain @click="handleAccept(result.id, index)"> Akceptuj</el-button>
                            <el-button type="danger" plain @click="handleThrow(result.id, index)"> Odrzuć</el-button>
                        </div>
                        <div v-else>
                            <div v-if="output[index].out === 'accept'" style="color: green;">Akceptowano!</div>
                            <div v-if="output[index].out === 'throw'" style="color: red;">Odrzucono!</div>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
        <el-button-group class="switch-page">
            <el-button type="primary" style="margin-top:20px;" @click="onSubmit()">Wyślij ocene</el-button>
        </el-button-group>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { sendReview } from '../../api/exam';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
    name: 'review',
    components: {
        BounceLoader
    },
    computed: {
        ...mapGetters({
            results: 'REVIEW_ANSWERS',
            user: 'REVIEW_USER',
            logs: 'REVIEW_LOGS',
            suspect: 'REVIEW_SUSPECT'
        }),
    },
    data() {
        return {
            output: [],
            lock: []
        }
    },
    mounted() {
        try {
            this.$store.dispatch("GET_REVIEW_ANSWERS", this.$route.params.id);
        } catch(error) {
            this.$message.error('Oops, coś poszło nie tak.');
            this.$router.go(-1)
        }

        for(let i = 0; i < this.results.length; i++) {
            this.lock.push(true);
        }

        console.log(this.lock);
    },
    methods: {
        handleAccept(id, index) {
            const out = {
                id: id,
                out: 'accept'
            }

            this.output.push(out);
            this.$set(this.lock, index, false);

        },
        handleThrow(id, index) {
            const out = {
                id: id,
                out: 'throw'
            }

            this.output.push(out);
            this.$set(this.lock, index, false);
        },
        async onSubmit() {
            try {
                await sendReview(this.$route.params.id, this.output);
                this.$message.success('Wyslano ocene!');
            }catch (error) {
                this.$message.error('Oops, coś poszło nie tak.');   
            }

            this.$router.push({
                    name: 'exams',
                });
        }
    }
}
</script>
<style>
    textarea {
        width:90%;
    }
</style>