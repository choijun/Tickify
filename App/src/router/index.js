/* eslint-disable */ 

import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home"
import Dashboard from "@/components/Dashboard"
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
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
            path: "/Dashboard",
            name: "Dashboard",
            component: Dashboard
        }
    ]
})
