<template>
    <div>
        <el-row>
            <h3>{{question.content}}</h3>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="3"><el-checkbox v-model="checkboxMap.A" @change="handleCheckedAnswer">A: {{question.A}}</el-checkbox></el-col>
                    <el-col :span="3"><el-checkbox v-model="checkboxMap.B" @change="handleCheckedAnswer">B: {{question.B}}</el-checkbox></el-col>
                    <el-col :span="3"><el-checkbox v-model="checkboxMap.C" @change="handleCheckedAnswer">C: {{question.C}}</el-checkbox></el-col>
                    <el-col :span="3"><el-checkbox v-model="checkboxMap.D" @change="handleCheckedAnswer">D: {{question.D}}</el-checkbox></el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Question",
        props: {
            question: null,
            updateResult: {
                Function
            }
        },
        data() {
            return {
                answer: {
                    uuid: null,
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
                    uuid: this.question.uuid,
                    answer: map
                })

                this.updateResult(this.answer);
            }
        }
    }
</script>

<style scoped>

</style>