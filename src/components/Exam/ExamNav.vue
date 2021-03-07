<template>
    <div>
        <router-link :to="{name: 'examsAdd'}" class="exams-buttons">
            <el-button type="primary">Nowy egzamin</el-button>
        </router-link>
        <router-link :to="{name: 'tests'}" class="exams-buttons">
            <el-button type="primary">Testy</el-button>
        </router-link>
        <router-link :to="{name: 'questions'}" class="exams-buttons">
            <el-button type="primary">Pytania</el-button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "ExamNav"
}
</script>

<style scoped>

</style>