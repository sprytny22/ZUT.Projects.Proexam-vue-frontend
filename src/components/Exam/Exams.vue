<template>
  <div>
    <el-row>
      <div>
        <ExamInfos/>
      </div>
    </el-row>
  </div>
</template>

<script>
import ExamInfos from './ExamInfos'

export default {
  name: "Exams",
  components: {
    ExamInfos,
  }
}
</script>

<style scoped>

</style>