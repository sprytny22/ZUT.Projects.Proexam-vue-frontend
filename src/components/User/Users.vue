<template>
  <div>
    <el-row class="top-buttons">
      <router-link :to="{name: 'usersAdd'}">
        <el-button type="primary">Dodaj użytkownika</el-button>
      </router-link>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="Szukaj" v-model="input"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <div>
        <UserInfo
            :first-name="'Piotr'"
            :last-name="'Klaczkowski'"
            :group-name="'WYK_24_GRP'"
        />
      </div>
    </el-row>
  </div>
</template>

<script>
import UserInfo from './UserInfo'

export default {
  name: "Users",
  components: {
    UserInfo
  }
}
</script>

<style scoped>

</style>