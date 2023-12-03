<template>
  <div class="layout-area p-20">
    <div class="layout-title">CHI TIẾT DỮ LIỆU HỆ THỐNG QUẢN LÝ XE TỰ ĐỘNG</div>
    <div class="layout-filter flex-wrap">
      <div class="filter-group flex-wrap col-sm-10">
        <!-- <div class="form-group col-sm-2">
          <label for="">Thời gian kết thúc</label>
          <input
            class="form-control"
            type="datetime-local"
            name="datimeStart"
            id="datimeStart"
            v-model="startDateTime"
          />
        </div>
        <div class="form-group col-sm-2">
          <label for="">Thời gian kết thúc</label>
          <input
            type="datetime-local"
            class="form-control"
            name="datimeEnd"
            id="datimeEnd"
            v-model="endDateTime"
          />
        </div>
        <div class="form-group col-sm-1">
          <label for="">Bộ phận</label>
          <select class="form-control" name="department" v-model="department" id="">
            <option>Lựa chọn 1</option>
            <option>Lựa chọn 2</option>
            <option>Lựa chọn 3</option>
          </select>
        </div> -->
        <div class="form-group">
          <label for="">Ford card ID</label>
          <input
            type="text"
            class="form-control"
            name="fordCardID"
            id=""
            aria-describedby="helpId"
            placeholder="Nhập Ford card ID"
            v-model="fordCardID"
          />
        </div>
        <!-- <div class="form-group">
          <label for="">Biển số xe</label>
          <input
            type="text"
            class="form-control"
            name="licensePlate"
            id=""
            aria-describedby="helpId"
            placeholder="Nhập biển số xe"
            v-model="licensePlate"
          />
        </div>
        <div class="form-group">
          <label for="">Họ và tên</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id=""
            aria-describedby="helpId"
            placeholder="Nhập họ và tên"
            v-model="name"
          />
        </div> -->
      </div>
      <div class="filter-action col-sm-2">
        <div class="btn btn-secondary" @click="searchData">Xuất excel</div>
        <div
          class="btn btn-primary"
          @click="searchData"
          style="margin-right: 10px"
        >
          Tìm kiếm
        </div>
      </div>
    </div>
    <div class="layout-content">
      <table class="table table-bordered">
        <thead class="thead-light">
          <tr>
            <th colspan="1" rowspan="2">No</th>
            <th colspan="1" rowspan="2">Type</th>
            <th colspan="1" rowspan="2">Ford card ID</th>
            <th colspan="2" rowspan="1">Vehicle In</th>
            <th colspan="2" rowspan="1">Vehicle Out</th>
            <th colspan="1" rowspan="2">Security confirmation</th>
            <th colspan="1" rowspan="2">Note/Action</th>
            <th colspan="1" rowspan="2">Handle</th>
          </tr>
          <tr>
            <th scope="col" style="width:160px">Date</th>
            <th scope="col" style="width:160px">Time</th>
            <th scope="col" style="width:160px">Date</th>
            <th scope="col" style="width:160px">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in this.data" :key="item._id">
            <th scope="row">{{ key }}</th>
            <td></td>
            <td>{{ item.FordCardIDIn }}</td>
            <td colspan="2">
              <div class="data-top">
                <div class="data-top__item">
                  {{ getDatetime(item.DateTimeIn, "date") }}
                </div>
                <div class="data-top__item">
                  {{ getDatetime(item.DateTimeIn, "time") }}
                </div>
              </div>
              <div class="data-bottom">
                <ImageZoom
                  v-if="item.ImageUrlIn != null"
                  :regular="item.ImageUrlIn"
                  :zoom="item.ImageUrlIn"
                  :zoom-amount="2"
                  :click-zoom="true"
                >
                  <img :src="item.ImageUrlIn" alt="" />
                </ImageZoom>
                <div v-else>Không có</div>
              </div>
            </td>
            <td colspan="2">
              <div class="data-top">
                <div class="data-top__item">
                  {{ getDatetime(item.DateTimeOut, "date") }}
                </div>
                <div class="data-top__item">
                  {{ getDatetime(item.DateTimeOut, "time") }}
                </div>
              </div>
              <div class="data-bottom">
                <ImageZoom
                  v-if="item.ImageUrlOut != null"
                  :regular="item.ImageUrlOut"
                  :zoom="item.ImageUrlOut"
                  :zoom-amount="2"
                  :click-zoom="true"
                >
                  <img :src="item.ImageUrlOut" alt="" />
                </ImageZoom>
                <div v-else>Không có</div>
              </div>
            </td>
            <td>Description 7</td>
            <td>Description 7</td>
            <td class="td-handle">
              <div class="row-handle-group">
                <div class="btn-handle" data-action="o-pop">
                  <i class="fi fi-rr-edit" style="color: blue"></i>
                </div>
                <div class="btn-handle" data-action="c-pop">
                  <i class="fi fi-rr-trash" style="color: red"></i>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import api from "@/api";
import moment from "moment-timezone";
import { VueImageZoomer as ImageZoom } from 'vue-image-zoomer';
export default {
  components: {ImageZoom},
  data() {
    return {
      data: [],
    };
  },
  setup() {
    // Tạo biến thời gian và đặt giá trị mặc định
    const startDateTime = ref(getDefaultStartTime());
    const endDateTime = ref(getDefaultEndTime());

    // Hàm lấy giá trị mặc định cho thời gian bắt đầu (6 giờ sáng)
    function getDefaultStartTime() {
      const now = moment()
        .tz("Asia/Ho_Chi_Minh")
        .startOf("day")
        .add(6, "hours");
      return now.format("YYYY-MM-DDTHH:mm");
    }

    // Hàm lấy giá trị mặc định cho thời gian kết thúc (7 giờ tối)
    function getDefaultEndTime() {
      const now = moment()
        .tz("Asia/Ho_Chi_Minh")
        .startOf("day")
        .add(19, "hours");
      return now.format("YYYY-MM-DDTHH:mm");
    }

    return {
      startDateTime,
      endDateTime,
    };
  },
  created(){
    this.searchData();
  },
  methods: {
    async searchData() {
      const fordCardID = this.fordCardID;
      const response = await api.post("/data/getreportdata", { fordCardID });
      if (response.status == 200) {
        this.data = response.data.data;
      }
    },
    getDatetime(dateTimeString, type) {
      const date = new Date(dateTimeString);
      if (dateTimeString == null) {
        return "Không có";
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      if (type == "date") {
        return `${year}-${month}-${day}`;
      } else {
        return `${hours}:${minutes}:${seconds}`;
      }
    },
  },
};
</script>
