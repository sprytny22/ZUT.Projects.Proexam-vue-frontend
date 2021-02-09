<template>
  <div>
    <router-link to='/'>Home</router-link>
    <router-link to='/profile'>Profile</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
name: "Navbar"
}
</script>

<style scoped>

</style>