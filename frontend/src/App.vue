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

      axios.get('http://localhost:3000/api/products', {headers : { authorization: `Bearer ${token}` } }).then(data => {
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
