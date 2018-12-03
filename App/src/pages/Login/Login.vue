<template>
  <div class="login-page">
    <b-container>
      <h5 class="logo">
        <i class="fa fa-circle text-gray" />
        sing
        <i class="fa fa-circle text-warning" />
      </h5>
      <Widget class="mx-auto" title="<h3 class='mt-0'>Login to your Web App</h3>" customHeader>
        <p class="text-muted mb-0 mt fs-sm">
          Use Facebook, Twitter or your email to sign in.
        </p>
        <p class="text-muted fs-sm">
          Don't have an account? Sign up now!
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" ref="username" v-model='input.username'
              required type="text" name="username" placeholder="Username" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="password" v-model='input.password'
            required type="password" name="password" placeholder="Password" />
          </div>
          <div class="clearfix">
            <div class="btn-toolbar float-right">
              <b-button type="submit" v-on:click='login()' size="sm" variant="inverse">Login</b-button>
            </div>
          </div>
          <div class="row no-gutters mt-3">
            <div class="col">
              <div class="abc-checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                />
                <label for="checkbox" class="text-muted fs-sm">Keep me signed in</label>
              </div>
            </div>
            <div class="col">
              <a class="mt-sm" href="">Trouble with account?</a>
            </div>
          </div>
        </form>
      </Widget>
    </b-container>
    <footer class="footer">
      2017 &copy; Sing. Admin Dashboard Template.
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import axios from 'axios';
import Router from '@/Routes.js'
axios.defaults.withCredentials = true;
 /* eslint-disable */ 
export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
      input: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // login() {
    //   const username = this.$refs.username.value;
    //   const password = this.$refs.password.value;

    //   if (username.length !== 0 && password.length !== 0) {
    //     window.localStorage.setItem('authenticated', true);
    //     this.$router.push('/app/main/analytics');
    //   }
    // },
    login() {
      if(this.input.username != '' && this.input.password != '') {
          //We should execute our Axios here. 
         
          axios.post('http://localhost:8080/api/user/login',{
            username:this.input.username,
            password:this.input.password   
          })
            .then(function (response) {
                // handle success
                Router.push('/app/Dashboard');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
      } else {
          console.log('A username and password must be present')
      }
    }
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/dashboard');
    }
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
