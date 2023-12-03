<template>
    <div>
      <h2>Đăng ký</h2>
      <form @submit="register">
        <input type="text" v-model="username" placeholder="Tên người dùng">
        <input type="password" v-model="password" placeholder="Mật khẩu">
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          // Gọi API đăng ký và xử lý phản hồi
          // ...
        } catch (error) {
          console.error('Đăng ký thất bại:', error);
        }
      },
    },
  };
  </script>
  