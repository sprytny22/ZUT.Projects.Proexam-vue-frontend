<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="4">
        <Navbar/>
      </el-col>
      <el-col :span="20" id="bdy">
        <div>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navbar from './layouts/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

body {
  background-color: #FEFEF2;
}

#app {
  width: 100%;
}

</style>
