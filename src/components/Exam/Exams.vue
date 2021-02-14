<template>
  <div>
    <el-row class="top-buttons">
      <router-link :to="{name: 'examsAdd'}" class="exams-buttons">
        <el-button type="primary">Nowy egzamin</el-button>
      </router-link>
      <router-link :to="{name: 'tests'}" class="exams-buttons">
        <el-button type="primary">Testy</el-button>
      </router-link>
      <router-link :to="{name: 'questions'}" class="exams-buttons">
        <el-button type="primary">Pytania</el-button>
      </router-link>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="Szukaj" v-model="input"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <div>

      </div>
    </el-row>
  </div>
</template>

<script>
export default {
name: "Exams"
}
</script>

<style scoped>

</style>