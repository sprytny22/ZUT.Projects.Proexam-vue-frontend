<template>
    <div id="login-page" v-if="!$store.getters.LOGGED_IN">
      <Login />
    </div>
    <div id="app" v-else>
      <el-row class="tac">
        <el-col :span="4">
          <el-row>
            <div class="exam-logo">
              <h3>PROEXAM</h3>
            </div>
          </el-row>
          <Sidebar/>
        </el-col>
        <el-col :span="20" id="bdy">
          <div id="wrapper">
            <router-view></router-view>
          </div>
        </el-col>`
      </el-row>
    </div>
</template>

<script>
import Sidebar from './layouts/Sidebar.vue'
import Login from './layouts/Security/Login'

export default {
  name: 'App',
  components: {
    Sidebar,
    Login
  }
}
</script>

<style>

body {
}

#app {
  width: 100%;
}
#wrapper {
  margin: 20px;
}
.table-buttons {
  margin-right: 10px;
}

.top-buttons {
  margin-bottom: 10px;
}

.exam-logo {
  margin-left: 20px;
}

.exams-buttons {
  margin-right: 20px;
}

</style>
