<template>
    <div class ="auth-area">
      <div class="auth-block">
        <div class="auth-block-item auth-block__left col-sm-5">
            <img src="/assets/images/logo.png" alt="">
        </div>
        <div class="auth-block-item auth-block__right col-sm-7">
            <h2 class="auth-block-item__title">Đăng nhập</h2>
            <form @submit.prevent="login" class="auth-block-item__content">
                <div class="form-group col-sm-12">
                  <label for="">Tài khoản</label>
                  <input type="text" v-model="email" class="form-control"  placeholder="Nhập email hoặc tài khoản">
                </div>
                <div class="form-group">
                  <label for="">Mật khẩu</label>
                  <input type="password" class="form-control" v-model="password" placeholder="Mật khẩu">
                </div>
                <button type="submit" class="btn btn-primary btn-login">Đăng nhập</button>
            </form>
            
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/api'; // Import tệp api.js
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.post('/auth/login', {
            email: this.email,
            password: this.password,
          });
          // Lưu token vào local storage hoặc cookies (nếu đăng nhập thành công)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.user.role);
  
          // Chuyển hướng người dùng sau khi đăng nhập thành công
          this.$router.push('/');
        } catch (error) {
          console.error('Đăng nhập thất bại:', error);
        }
      },
    },
  };
  </script>
  