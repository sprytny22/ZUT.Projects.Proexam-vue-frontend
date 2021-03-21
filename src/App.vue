<template>
    <div id="login-page" v-if="!$store.getters.LOGGED_IN">
      <Login />
    </div>
    <div id="app" v-else>
      <el-row class="tac">
        <el-col :span="4">
          <el-row>
            <div class="exam-logo">
              <h3><b>PROEXAM</b></h3>
            </div>
          </el-row>
          <el-row>
            <Sidebar/>
          </el-row>
        </el-col>
        <el-col :span="20" id="bdy">
          <Navbar />
          <div id="wrapper">
            <el-row class="top-buttons">
              <ActionsNavbar />
            </el-row>
            <router-view />
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import Sidebar from './layouts/Sidebar.vue'
import Navbar from './layouts/Navbar.vue'
import Login from './layouts/Security/Login'
import ActionsNavbar from './components/Common/ActionsNavbar'

export default {
  name: 'App',
  components: {
    Sidebar,
    Navbar,
    Login,
    ActionsNavbar
  }
}
</script>

<style>

body {
}

#app {
    font-family: "Lato-Light";
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

@font-face {
    font-family: "Lato-Light";
    src: url("../fonts/Lato-Light.ttf");
}

.nav-button{
  font-size: 13px;
  font-weight: normal;
}
.nav-buttons {
  float: right;
}

</style>
