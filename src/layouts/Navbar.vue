<template>
  <div>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#FEFEF2"
        text-color="#A46E56"
        active-text-color="#fbb788"
        :router="true">
      <el-menu-item index="/users" :route="{name: 'users'}">
        <span>Użytkownicy</span>
      </el-menu-item>
      <el-menu-item index="/groups" :route="{name: 'groups'}">
        <span>Grupy</span>
      </el-menu-item>
      <el-menu-item index="/exams" :route="{name: 'exams'}">
        <span>Egzaminy</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>Panel administratora</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
name: "Navbar"
}
</script>

<style>
</style>