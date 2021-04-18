<template>
    <div>
        <el-card class="box-card my-box-card" :key="question.content">
            <el-row>
                <h3>{{index+1}}. {{question.content}}</h3>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="1"><el-checkbox v-model="checkboxMap.A" @change="handleCheckedAnswer"/></el-col>
                        <el-col :span="20">A: {{question.A}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="1"><el-checkbox v-model="checkboxMap.B" @change="handleCheckedAnswer"/></el-col>
                        <el-col :span="20">B: {{question.B}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="1"><el-checkbox v-model="checkboxMap.C" @change="handleCheckedAnswer"/></el-col>
                        <el-col :span="20">C: {{question.C}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="1"><el-checkbox v-model="checkboxMap.D" @change="handleCheckedAnswer"/></el-col>
                        <el-col :span="20">D: {{question.D}}</el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Question",
        props: {
            question: null,
            index: Number,
            updateResult: {
                Function
            }
        },
        data() {
            return {
                answer: {
                    answerId: null,
                    type: 'close',
                    answer: null
                },
                checkboxMap: {
                    A: false,
                    B: false,
                    C: false,
                    D: false
                }
            }
        },
        methods: {
            handleCheckedAnswer() {
                let map = [];

                if (this.checkboxMap.A) {
                   map.push('A')
                }
                if (this.checkboxMap.B) {
                    map.push('B')
                }
                if (this.checkboxMap.C) {
                    map.push('C')
                }
                if (this.checkboxMap.D) {
                    map.push('D')
                }

                Object.assign(this.answer, {
                    answerId: this.question.answerId,
                    answer: map
                })

                this.updateResult(this.answer);
            }
        }
    }
</script>

<style scoped>

</style>