
    <script>
        /* eslint-disable */
    </script>

<template>
<div class="hello">

    <div class="container">
    <h3>Hello {{LoggedInUser}}!</h3> 
    </div>
</div>
</template>

<script>
import Router from '@/router/index.js'
import VueCookies from 'vue-cookies'
import axios from 'axios';

export default {
  name: 'Dashboard',
  data(){
      return{
          IsLoggedIn: this.$cookies.get("auth"),       // return value              
          LoggedInUser: this.$cookies.get("user"),       // return value       
          Tickets: ""                      
      }
  },
  methods:{
      checkUserLoggedIn: function(){
        var x = this.$cookies.get("auth")       // return value     
        if(x === null){
            Router.push("Home");
        }
      }
  },
  beforeMount(){
      this.checkUserLoggedIn()
  },
  mounted(){
      axios.get('http://localhost:8080/api/tickets/')
        .then(function (response) {
            // handle success
            this.Tickets = response.data;
            console.log(this.Tickets);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
  }
}

</script>