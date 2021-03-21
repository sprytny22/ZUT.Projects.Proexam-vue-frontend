<template>
    <div>
<!--        <el-row :span="24" v-for="test in tests" :key="test.uuid">-->
<!--            <Test-->
<!--                :key="test.uuid"-->
<!--                :test="test"-->
<!--            />-->
<!--        </el-row>-->
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Tests.vue",
        computed: {
            ...mapGetters({
                tests: 'TESTS'
            }),
        },
        mounted() {
            this.$store.dispatch("GET_TESTS");
            this.$store.dispatch("GET_QUESTIONS");
        }
    }
</script>

<style scoped>

</style>