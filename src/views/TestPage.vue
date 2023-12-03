<template>
    <div>
      <h1>Data from Server</h1>
      <button class="btn-action btn btn-primary" @click="createData">Tạo data</button>
    </div>
  </template>
  
  <script>
  import api from "@/api"; // Import tệp api.js
  export default {
    data() {
      return {
        data: [],
      };
    },
    methods: {
      async createData() {
        const response = await api.post("/data/create");
        console.log(response)
      },
    },
  };
  </script>
  