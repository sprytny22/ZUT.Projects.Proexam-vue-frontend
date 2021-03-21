<template>
  <div id="group-tile">
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
            label="Nazwa"
            width="180">
        </el-table-column>
        <el-table-column
            prop="numberOfMembers"
            label="Ilość osób"
            width="180">
        </el-table-column>
        <el-table-column label="akcje">
          <router-link :to="{name: 'groupUsersList'}" class="table-buttons">
            <el-button type="info">Lista osób</el-button>
          </router-link>
          <router-link :to="{name: 'groupUsersList'}" class="table-buttons">
            <el-button type="primary">Przydziel do grupy</el-button>
          </router-link>
          <router-link :to="{name: 'groupUsersList'}" class="table-buttons">
            <el-button type="danger">Usun grupe</el-button>
          </router-link>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "GroupInfo",
  data() {
    return {
      tableData: [{
        id: '1',
        name: 'GLK_23_WYK',
        numberOfMembers: '23'
      }, {
        id: '2',
        name: 'GLK_22_WYK',
        numberOfMembers: '2'
      }, {
        id: '3',
        name: 'GLK_23_LAB',
        numberOfMembers: '15'
      }, {
        id: '4',
        name: 'GLK_22_LAB',
        numberOfMembers: '8'
      }]
    }
  }
}
</script>

<style scoped>
#group-tile {
  margin-bottom: 20px;
}
</style>