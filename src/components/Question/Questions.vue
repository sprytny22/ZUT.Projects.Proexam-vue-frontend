<template>
    <div>
        <el-table
                :data="questions"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="Treść"
                    width="150">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    prop="category"
                    label="Kategoria">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "Questions",
        computed: {
            ...mapGetters({
                questions: 'QUESTIONS',
            })
        },
        mounted() {
            this.$store.dispatch("GET_QUESTIONS");
        }
    }
</script>

<style scoped>

</style>