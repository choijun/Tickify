/* eslint-disable */ 
// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from '@/components/Home'
// import dashboard from '@/views/dashboard'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: "/dashboard",
//       name: "dashboard",
//       component: dashboard
//     }
//   ]
// })
import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home"
import dashboard from "@/views/dashboard"
import axios from 'axios'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: "Home"
            }
        },
        {
            path: "/Home",
            name: "Home",
            component: Home
        },
        {
            path: "/secure",
            name: "secure",
            component: dashboard
        }
    ]
})
