<template>
  <div>
    <h1>VUE APP</h1>
    <div>
      <button @click="getData()">Get data from localhost:3000, from vue</button>
    </div> 
    <p>{{msg}}</p> 
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'app', 
  data () {  
    return {
      msg: 'waiting'
    } 
  },
  methods: {
    getData() {
      console.log("Loading DATA!!! ");
      
      // 
      var token = 'FAKE-TOKEN-JUST-A-TEST';
      
      //axios.defaults.withCredentials = true;
      //axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded'};
      /*const http = axios.create ({
        baseURL: process.env.VUE_APP_ROOT_API,
        timeout: 1000,
        withCredentials: true,
        headers: {'Content-Type': 'application/json'},
      });*/

      /*
      http.interceptors.request.use (
        function (config) {
          if (token) config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        function (error) {
          return Promise.reject (error);
        }
      );      
      */

      axios.get('http://localhost:3000/api/products', {headers : {'Content-Type': 'application/x-www-form-urlencoded',  authorization: `Bearer ${token}` } }).then(data => {
        console.log('data loaded');
        this.msg = data;
      }).catch(err => {
        console.log('Error loading Data', err);
        this.msg = 'ERRO : ' + JSON.stringify(err);
      });
    }
   }
}
</script>
