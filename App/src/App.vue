<template>
  <div id="dashboard">
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'dashboard',
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: 'init@init.nl',
        password: 'init'
      }
    }
  },
  mounted(){
    if(!this.authenticated) {
                this.$router.replace({ name: "Home" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
                this.authenticated = true;
            },
            logout() {
                this.authenticated = false;
            }
        }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
