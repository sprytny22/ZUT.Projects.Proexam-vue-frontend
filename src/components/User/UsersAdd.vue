<template>
  <div>
    <el-row class="top-buttons">
      <h3>Dodaj użytkownika</h3>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Imie">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Nazwisko">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Hasło">
            <el-input v-model="form.name" show-password></el-input>
          </el-form-item>
          <el-form-item label="Grupa">
            <el-select v-model="form.region" placeholder="Grupa">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Rola">
            <el-select v-model="form.region" placeholder="Rola w systemie">
              <el-option label="Administrator" value="shanghai"></el-option>
              <el-option label="Egzaminator" value="egz"></el-option>
              <el-option label="Użytkownik" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "usersAdd",
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>