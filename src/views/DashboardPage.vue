
<template>
  <div class="layout-area">
    <modalQuestion ref="popup"></modalQuestion>
    <div class="layout-grid grid-container">
      <div class="grid-item card">
        <div
          class="grid-item__top"
          style="
            text-align: center;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 20px;
          "
        >
          <h2>HỆ THỐNG QUẢN LÝ XE TỰ ĐỘNG</h2>
        </div>
        <div class="grid-item__bottom">
          <img src="/assets/images/logo.png" alt="" />
        </div>
        <div class="grid-item__footer">
          <div class="footer-item col-sm-3">
            <button class="btn-action btn btn-primary" @click="logout">Đăng xuất</button>
          </div>

          <div class="footer-item col-sm-4">
            <div class="btn btn-success btn-action">Cài đặt</div>
          </div>
          <a  href="/report" class="footer-item col-sm-5">
            <div class="btn btn-primary btn-action">Hậu kiểm</div>
          </a>
        </div>
      </div>
      <div v-for="lane in lanes" :key="lane.id" class="grid-item card lane-item" :data-lane="lane.id">
        <div class="grid-item__top">
          <div class="item-title col-sm-12">
            <span>{{lane.titleTop}}</span>
          </div>
          <div class="item-content flex-grap">
            <div class="col-sm-7 content-detail">
              <ImageZoom 
                :regular="lane.LaneIn.ImageUrlIn" 
                :zoom="lane.LaneIn.ImageUrlIn"
                :zoom-amount="2"
                :click-zoom="true"			
                >
                <img :src="lane.LaneIn.ImageUrlIn" />
              </ImageZoom>
            </div>
            <div class="col-sm-5 content-detail flex-grap">
              <div
                class="detail-top col-sm-12"
                style="
                  border-bottom: 2px solid #62adad;
                  text-align: center;
                  padding: 10px 0px 0px 0px;
                  font-size: 24px;
                  font-weight: bold;
                "
              >
                <div class="col-sm-12">{{ lane.LaneIn.LicensePlateIn }}</div>
              </div>
              <div class="detail-bottom col-sm-12">                      
                <div class="col-sm-12">CDSID: <strong>{{ lane.LaneIn.CdsidIn }}</strong></div>
                <div class="col-sm-12">Họ và tên: <strong>{{ lane.LaneIn.FullNameIn }}</strong></div>
                <div class="col-sm-12">Phòng ban: <strong>{{ lane.LaneIn.DepartmentIn }}</strong></div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-item__bottom">
          <div class="item-title col-sm-12">
            <span>{{lane.titleBottom}}</span>
          </div>
          <div class="item-content flex-grap">
            <div class="col-sm-6 content-detail">
              <div class="detail-top col-sm-12">
                <ImageZoom 
                  :regular="lane.LaneOut.ImageUrlIn" 
                  :zoom="lane.LaneOut.ImageUrlIn"
                  :zoom-amount="2"
                  :click-zoom="true"			
                  >
                  <img :src="lane.LaneOut.ImageUrlIn" alt="" />
                </ImageZoom>
                
              </div>
              <div class="detail-bottom col-sm-12 text-center">
                <div><strong>{{lane.LaneOut.LicensePlateIn}}</strong></div>
              </div>
            </div>
            <div class="col-sm-6 content-detail">
              <div class="detail-top col-sm-12">
                <ImageZoom 
                  :regular="lane.LaneOut.ImageUrlOut" 
                  :zoom="lane.LaneOut.ImageUrlOut"
                  :zoom-amount="2"
                  :click-zoom="true"			
                  >
                  <img :src="lane.LaneOut.ImageUrlOut" alt="" />
                </ImageZoom>
              </div>
              <div class="detail-bottom col-sm-12 text-center">
                <div><strong>{{lane.LaneOut.LicensePlateOut}}</strong></div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-item__footer" :style="{ 'background-color': ( lane.LaneOut.IsEdit !==2 && lane.LaneOut.Status != null && lane.LaneOut.Status.toUpperCase() !== 'OK') ? 'red' : 'aqua' }">
          <div class="footer-item">
            <p v-if="lane.LaneOut.DateTimeIn!=='' && lane.LaneOut.DateTimeIn!= null">
              OUT:{{lane.LaneOut.DateTimeOut}} - IN:{{lane.LaneOut.DateTimeIn}} 
              <br>
              {{ lane.LaneOut.FullNameOut}} - {{ lane.LaneOut.DepartmentOut}}
            </p>
          </div>
          <div class="group-button" v-if="(lane.LaneOut.IsEdit !==2 && lane.LaneOut.Status != null && lane.LaneOut.Status.toUpperCase() !== 'OK') && (lane.LaneOut.pkid !== null && lane.LaneOut.pkid != '')">
            <button class="btn btn-secondary btn-status"  @click="openPopupSetEdit(lane.LaneOut.pkid)">Hậu kiểm</button>
            <button class="btn btn-success btn-status"  @click="openPopupSetStatus(lane.LaneOut.pkid)">Đã kiểm</button>
          </div>
          <div class="group-button" v-else>
            <button class="btn btn-secondary btn-status" disabled>Hậu kiểm</button>
            <button class="btn btn-success btn-status" disabled>Đã kiểm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import io from "socket.io-client";
import { VueImageZoomer as ImageZoom } from 'vue-image-zoomer';
import modalQuestion from "@/views/modals/questionPopup";
import { serverIP } from '@/configs/configDefault';
export default {
  components:{
    ImageZoom,
    modalQuestion,
  },
  data() {
    return {
      lanes: [ ],
    };
  },
  methods: {
    async openPopupSetStatus(pkid) {
      try {
        const result = await this.$refs.popup.open("Bạn có muốn thay đổi trạng thái của từ NG thành OK?");
        if(result){
          this.setStatus(pkid)
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async openPopupSetEdit(pkid) {
      try {
        const result = await this.$refs.popup.open("Bạn có muốn chỉnh sửa dữ liệu này ở mục hậu kiểm?");
        if(result){
          this.setEdit(pkid)
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async setStatus(pkid){
      var result = await api.post("/data/setstatus", { pkid });
      if(result.status == 200){
        console.log(result)
      }
      else{
        console.log("ng")
      }
    },
    async setEdit(pkid){
      var result = await api.post("/data/setedit", { pkid });
      if(result.status == 200){
        console.log(result)
      }
      else{
        console.log("ng")
      }
    },
    async logout() {
      try {
        await api.post("/auth/logout");
        localStorage.removeItem("token");
        this.$router.replace("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    connectSocket(){
      const socket = io(serverIP);
      socket.on("dataUpdate", (data) => {
        
        const LaneIndex = this.lanes.findIndex((lane) => lane.id === data.LaneID);
        console.log(data)
          if (LaneIndex !== -1) {
            this.lanes[LaneIndex] = { ...this.lanes[LaneIndex], ...data };
          }
      });
      socket.emit("sendData");
    },
    async loadDefaultData(){
      for(var i = 1;i <= 5;i++){
          this.lanes.push({
            id: i,
            titleTop:`Làn vào ${i}`,
            titleBottom:`Làn ra ${i}`,
            LaneIn:{
              ImageUrlIn:"/assets/images/default.jpg",
              LicensePlateIn:"--Biển số xe--",
              CdsidIn:"--Mã nhân viên--",
              FullNameIn:"--Tên nhân viên rất dài--",
              DepartmentIn:"--Phòng ban--"
            },
            LaneOut:{
              pkid:'',
              ImageUrlIn:"/assets/images/default.jpg",
              ImageUrlOut:"/assets/images/default.jpg",
              LicensePlateIn:"--Biển số xe--",
              LicensePlateOut:"--Biển số xe--",
              DateTimeIn:'',
              DateTimeOut:'',
              CdsidIn:"--Mã nhân viên--",
              FullNameIn:"--Tên nhân viên--",
              DepartmentIn:"--Phòng ban--",
              CdsidOut:"--Mã nhân viên--",
              FullNameOut:"--Tên nhân viên--",
              DepartmentOut:"--Phòng ban--",
              Status:"Ok",
              IsEdit:0,
            }
          })
        }
      const response = await api.post("/data/getdefault");
      
      if(response.status == 200){
        const dataResult = response.data.data
        if(dataResult.length > 0){
          dataResult.forEach(element => {
            const LaneIndex = this.lanes.findIndex((lane) => lane.id === element.LaneID);
            if (LaneIndex !== -1) {
              this.lanes[LaneIndex] = { ...this.lanes[LaneIndex], ...element };
            }
          });
        }
      }
    }
  },
  created() {
    this.connectSocket();
    this.loadDefaultData();
  },
};
</script>
