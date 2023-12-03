<template>
    <div>
      <h1>Cài đặt thông số</h1>
      <div class="form-group col-sm-8">
        <label for="">IP Server</label>
        <input type="text" name="ipserver" id="" class="form-control" placeholder="" aria-describedby="helpId">
        <small id="helpId" class="text-muted">Cài đặt ip truy cập server</small>
      </div>
      <div class="form-group col-sm-4">
        <label for="">Port Server</label>
        <input type="text" name="portserver" id="" class="form-control" placeholder="" aria-describedby="helpId">
        <small id="helpId" class="text-muted">Cài đặt port truy cập server</small>
      </div>
      <div class="form-group col-sm-8">
        <label for="">IP Client</label>
        <input type="text" name="ipclient" id="" class="form-control" placeholder="" aria-describedby="helpId">
        <small id="helpId" class="text-muted">Cài đặt ip truy cập client</small>
      </div>
      <div class="form-group col-sm-4">
        <label for="">Port Client</label>
        <input type="text" name="portclient" id="" class="form-control" placeholder="" aria-describedby="helpId">
        <small id="helpId" class="text-muted">Cài đặt port truy cập client</small>
      </div>
      <div class="form-group col-sm-8">
        <label for="">Mongose connect string</label>
        <input type="text" name="mongosestring" id="" class="form-control" placeholder="" aria-describedby="helpId">
        <small id="helpId" class="text-muted">Cài đặt chuỗi kết nối tới mongose</small>
      </div>
      <div class="form-group col-sm-4">
        <label for="">Mongose data table</label>
        <input type="text" name="mongosetable" id="" class="form-control" placeholder="" aria-describedby="helpId">
        <small id="helpId" class="text-muted">Cài đặt bảng dữ liệu mongose</small>
      </div>
      <div class="form-group col-sm-12">
        <label for="">Image Path</label>
        <input type="text" name="imagepath" id="" class="form-control" placeholder="" aria-describedby="helpId">
        <small id="helpId" class="text-muted">Đường dẫn hình ảnh - đến thư mục</small>
      </div>
      <div class="form-group col-sm-12">
        <label for="">ID File Path</label>
        <input type="text" name="idfilepath" id="" class="form-control" placeholder="" aria-describedby="helpId">
        <small id="helpId" class="text-muted">Đường dẫn file ID - Cả tên file</small>
      </div>
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
  