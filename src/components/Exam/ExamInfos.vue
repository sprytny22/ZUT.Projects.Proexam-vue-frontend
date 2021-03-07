<template>
    <div>
        <el-table
                :data="exams"
                :row-class-name="'success-row'"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="Nazwa"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="Status"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="startDate"
                    label="Data otwarcia"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    label="czas startu"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="czas zamkniecia">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="Operations"
                    width="120">
                <template slot-scope="">
                    <el-button @click="handleClick" type="text" size="small">Detail</el-button>
                    <el-button type="text" size="small">Edit</el-button>
                </template>
            </el-table-column>
<!--            <el-table-column>-->
<!--                <el-button type="warning" plain>Potwierdz</el-button>-->
<!--                <el-button type="success" plain>Roczpocznij</el-button>-->
<!--                <el-button type="info" plain>Ogladaj</el-button>-->
<!--                <el-button type="info" plain>Zobacz rezultat</el-button>-->
<!--            </el-table-column>-->
        </el-table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "ExamInfos",
        computed: {
            ...mapGetters({
                exams: 'EXAMS'
            }),
        },
        mounted () {
            this.$store.dispatch("GET_EXAMS")
        }
    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>