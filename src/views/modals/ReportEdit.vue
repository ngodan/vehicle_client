<template>
  <div class="popup-overlay report-edit" v-if="isVisible">
    <div class="popup-container">
      <div class="popup-content">
        <p class="title">Thay đổi dữ liệu</p>
        <div class="form-group col-sm-12">
          <label for="">Dạng lỗi</label>
          <select class="form-control" name="typeError" v-model="typeError" id="">
            <option value="">Chọn loại lỗi</option>
            <option value="Lỗi nhận diện sai">Lỗi nhận diện sai</option>
            <option value="Lỗi biển">Lỗi biển</option>
            <option value="Lỗi ánh sáng">Lỗi ánh sáng</option>
            <option value="Lỗi con người">Lỗi con người</option>
          </select>
        </div>
        <div class="form-group">
          <label for="">Mô tả chi tiết</label>
          <textarea class="form-control" name="confirm" id="" rows="3" v-model="confirm"></textarea>
        </div>
        <div class="form-group">
          <label for="">Hành động</label>
          <textarea class="form-control" name="note" id="" rows="3" v-model="note"></textarea>
        </div>
        <div class="form-group">
          <label for="">Xác nhận đã OK</label>
          <label class="switch" for="checkbox">
            <input :checked="(status == 'OK')"  type="checkbox" id="checkbox" @change="handleChange($event)" />
            <div class="slider round"></div>
          </label>
        </div>
        
        <button class="btn btn-success " @click="saveDocument">Save</button>
        <button class="btn btn-danger " @click="handleCancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      isVisible: false,
      note: "",
      confirm: "",
      pkid:"",
      status:"",
      typeError:"",
      resolveFunction: null,
      rejectFunction: null,
    };
  },
  methods: {
    handleChange(event){
      this.status = event.target.checked ? "OK" : "NOK";
      
    },
    open(pkid,confirm,note,status,typeError) {
      this.isVisible = true;
      this.confirm = confirm;
      this.note = note;
      this.pkid = pkid;
      this.status = status;
      this.typeError = typeError;
      console.log(typeError)
      return new Promise((resolve, reject) => {
        this.resolveFunction = resolve;
        this.rejectFunction = reject;
      });
    },
    async saveDocument() {
      var result = await api.post("/data/setnote", { pkid: this.pkid,confirm:this.confirm,note:this.note,status:this.status,typeError:this.typeError });
      if(result.status == 200){
        this.isVisible = false;
        this.resolveFunction(true);
      }
      else{
        console.log("ng")
      }
      
    },
    handleCancel() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
/* Add your styles for the popup overlay and container here */
</style>
