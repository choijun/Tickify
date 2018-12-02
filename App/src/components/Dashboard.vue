
<template>
<div class="hello">
    <div id="menu">
        <div class="row">
        <div class="col-sm-12" style="margin-top:10px; float:right;" >
            <div id="imaginary_container"> 
                <div class="input-group stylish-input-group" style="float:right; width:20%; margin-right:10px;" >
                    <input type="text" class="form-control"  placeholder="Search" >
                    <span class="input-group-addon">
                        <button type="submit">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>  
                    </span>
                </div>
            </div>
        </div>
	</div>
    <div id="bar">

    </div>
    </div>
    <div class="container">
        <div id=boxes>
            <div class="row">
                <div id="crit">
                    <div class="card text-white bg-danger mb-3">
                        <div class="card-header" style="text-align:center">Critical</div>
                        <div class="card-body" style="padding:0px !important; text-align:center;">
                            <h2 class="card-title">43</h2>
                        </div>
                    </div>
                </div>
                <div id="moderate">
                    <div class="card text-white bg-warning mb-3" >
                    <div class="card-header" style="text-align:center">Moderate</div>
                        <div class="card-body" style="padding:0px !important; text-align:center;">
                            <h2 class="card-title">12</h2>
                        </div>
                    </div>
                </div>
                <div id="all">
                    <div class="card text-white bg-primary mb-3" >
                    <div class="card-header" style="text-align:center">Open Tickets</div>
                        <div class="card-body" style="padding:0px !important; text-align:center;">
                            <h2 class="card-title">75</h2>
                        </div>
                    </div>
                </div>
                <div id="done">
                    <div class="card text-white bg-success mb-3" >
                    <div class="card-header" style="text-align:center">Solved Tickets</div>
                        <div class="card-body" style="padding:0px !important; text-align:center;">
                            <h2 class="card-title">234</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div style="clear:both"></div>
    <hr/>
    <div class="form-group">
    <select class="form-control" id="sel1" style="width:20%; float:right;">
        <option>Sort by most recently</option>
        <option>Sort by priority</option>
    </select>
    </div> 
 <div style="clear:both; margin-bottom:5px"></div>
       <div class="panel panel-default">
          <!-- <div class="panel-heading">
              
          </div> -->
            <div class="panel-body" style="margin-top:0px;">
                <div style="float:right">
                    Category: {{Tickets[0].category}}
                </div>
                <div class="card text-white bg-primary mb-3" style="max-width: 20rem; float:left; min-width:10rem; text-align:center;">
                    <div class="card-header">#4234</div>
                    <div class="card-body" style="padding:0px; text-align:center;">
                        <h5 class="card-title">OPEN</h5>
                    </div>
                </div>
                <div style="float:left; margin-left:20px">
                    <h4>{{Tickets[0].title}}</h4>
                    {{Tickets[0].content}}
                </div>
                <div style="clear:both"></div>
                <hr style="margin:0 !important"/>
                <div style="font-size:16pt;">Assigned to: {{Tickets[0].assigned}} | Raised by: {{Tickets[0].raised}} | On date: {{Tickets[0].date}}</div>
            </div>
        </div>
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
          Tickets: null    
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
        .then(response => {
            this.Tickets = response.data;
            console.log(this.Tickets);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
  }
}

</script>

<style>
body{
    height:100%; /* force the BODY element to match the height of the HTML element */
}

#ç{
    clear:both;
}
#menu {
    height:60px;
    background-color:#343434;
}

#boxes{
    display: block;
    margin-top:10px;
    float:left;
    width:100%;
}

#crit{
    width:22%;
    margin:5px;
}
#moderate{
    width:22%;
    margin:5px;
    margin-left:3%;
}
#all{
    width:22%;
    margin:5px;
    margin-left:3%;
}
#done{
    width:22%;
    margin:5px;
    margin-left:3%;
}
#bar{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    overflow:hidden;
    z-index:-1; /* Remove this line if it's not going to be a background! */
    background-color:#4C494C;
    width:13%;
}
.stylish-input-group .input-group-addon{
    background: white !important; 
}
.stylish-input-group .form-control{
	border-right:0; 
	box-shadow:0 0 0; 
	border-color:#ccc;
}
.stylish-input-group button{
    border:0;
    background:transparent;
}
</style>