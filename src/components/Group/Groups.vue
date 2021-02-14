<template>
  <div>
    <el-row class="top-buttons">
      <router-link :to="{name: 'usersAdd'}" class="exams-buttons">
        <el-button type="primary">Dodaj grupe</el-button>
      </router-link>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="Szukaj" v-model="input"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <div>
        <GroupInfo />
      </div>
    </el-row>
  </div>
</template>

<script>
import GroupInfo from './GroupInfo'

export default {
  name: "Groups",
  components: {
    GroupInfo
  }
}
</script>

<style scoped>

</style>