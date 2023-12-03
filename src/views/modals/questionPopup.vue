<template>
    <div class="popup-overlay" v-if="isVisible">
      <div class="popup-container">
        <div class="popup-content">
          <p class="title">Thông báo</p>
         
          <p>{{ message }}</p>
          <button class="btn btn-success " @click="handleOk">OK</button>
          <button class="btn btn-danger " @click="handleCancel">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: false,
        message: "",
        resolveFunction: null,
        rejectFunction: null,
      };
    },
    methods: {
      open(message) {
        this.isVisible = true;
        this.message = message;
  
        return new Promise((resolve, reject) => {
          this.resolveFunction = resolve;
          this.rejectFunction = reject;
        });
      },
      handleOk() {
        this.isVisible = false;
        if (this.resolveFunction) {
          this.resolveFunction(true);
        }
      },
      handleCancel() {
        this.isVisible = false;
        // if (this.rejectFunction) {
        //   this.rejectFunction("Cancel");
        // }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles for the popup overlay and container here */
  </style>
  