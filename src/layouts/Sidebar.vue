<template>
  <div>
    <el-menu
        default-active="2"
        class="sidebar"
        :router="true">
      <el-menu-item index="/exams" :route="{name: 'exams'}">
        <span>Egzaminy</span>
      </el-menu-item>
      <el-menu-item index="/admin" :route="{name: 'admin'}" v-if="$isGranted('ROLE_ADMIN')">
        <span>Panel administratora</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
name: "Sidebar"
}
</script>

<style>
  .sidebar {
    height: 100%;
  }
</style>