<template>
  <div>
    <el-row>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="ID"
            width="50">
        </el-table-column>
        <el-table-column
            prop="name"
            label="Imie"
            width="150">
        </el-table-column>
        <el-table-column
            prop="surname"
            label="Nazwisko"
            width="180">
        </el-table-column>
        <el-table-column
            prop="groupName"
            label="Nazwa grupy"
            width="180">
        </el-table-column>
        <el-table-column label="akcje">
          <el-row>
            <el-col :span="8"><el-button type="info">Zmień hasło</el-button></el-col>
            <el-col :span="8"><el-button type="danger">Usun</el-button></el-col>
          </el-row>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      tableData: [{
        id: '1',
        name: 'Piotr',
        surname: 'Klaczkowski',
        groupName: 'GLK_22_LAB'
      }, {
        id: '2',
        name: 'Dariusz',
        surname: 'Król',
        groupName: 'GLK_23_LAB'
      }, {
        id: '3',
        name: 'Kamil',
        surname: 'Janas',
        groupName: 'GLK_22_WYK'
      }]
    }
  }
}
</script>

<style>

</style>