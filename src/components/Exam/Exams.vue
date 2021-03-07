<template>
  <div>
    <el-row class="top-buttons">
      <ExamNav />
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="Szukaj"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <div>
        <ExamInfos/>
      </div>
    </el-row>
  </div>
</template>

<script>
import ExamNav from './ExamNav'
import ExamInfos from './ExamInfos'

export default {
  name: "Exams",
  components: {
    ExamNav,
    ExamInfos
  }
}
</script>

<style scoped>

</style>