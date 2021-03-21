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
            width="180">
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
          <el-button type="info">Lista osób</el-button>
          <el-button type="primary">Przydziel do grupy</el-button>
          <el-button type="danger">Usun grupe</el-button>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "GroupUsersList",
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

<style scoped>

</style>