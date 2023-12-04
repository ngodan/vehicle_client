<template>
  <ReportEdit ref="popup"></ReportEdit>
  <div class="layout-area p-20">
    <div class="layout-title">CHI TIẾT DỮ LIỆU HỆ THỐNG QUẢN LÝ XE TỰ ĐỘNG</div>
    <div class="layout-filter flex-wrap">
      <div class="filter-group flex-wrap col-sm-10">
        <div class="form-group col-sm-2">
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
        <div class="form-group col-sm-2">
          <label for="">Bộ phận</label>
          <select class="form-control" name="department" v-model="department" id="">
            <option value="" selected>Chọn bộ phận</option>
            <option v-for="option in departmentOptions" :key="option.value">{{ option.label }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="">Họ và tên(Không dấu)</label>
          <input
            type="text"
            class="form-control"
            name="fordCardID"
            id=""
            aria-describedby="helpId"
            placeholder="Nhập tên nhân viên"
            v-model="fullName"
          />
        </div>
        <div class="form-group">
          <label for="">CDSID</label>
          <input
            type="text"
            class="form-control"
            name="fordCardID"
            id=""
            aria-describedby="helpId"
            placeholder="Nhập CDSID"
            v-model="cdsid"
          />
        </div>
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
      </div>
      <div class="filter-action col-sm-2">
        <div
          class="btn btn-primary"
          @click="exportToExcel"
          style="margin-right: 10px"
        >
          Xuất excel
        </div>
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
            <th colspan="1" rowspan="2">Staff information</th>
            <th colspan="2" rowspan="1">Vehicle In</th>
            <th colspan="2" rowspan="1">Vehicle Out</th>
            <th colspan="1" rowspan="2">Security confirmation</th>
            <th colspan="1" rowspan="2">Note/Action</th>
            <th colspan="1" rowspan="2">Handle</th>
          </tr>
          <tr>
            <th scope="col" style="width: 160px">Date</th>
            <th scope="col" style="width: 160px">Time</th>
            <th scope="col" style="width: 160px">Date</th>
            <th scope="col" style="width: 160px">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in this.data" :key="item._doc._id">
            <th scope="row" style="vertical-align: middle; text-align: center">
              {{ key }}
            </th>
            <td></td>
            <td style="vertical-align: middle">
              <ul>
                <li>
                  Ford Card ID:<strong>{{ item._doc.FordCardIDIn }}</strong>
                </li>
                <li>
                  CDSID: <strong>{{ item._doc.CdsidIn }}</strong>
                </li>
                <li>
                  Full name: <strong>{{ item._doc.FullNameIn }}</strong>
                </li>
                <li>
                  Department: <strong>{{ item._doc.DepartmentIn }}</strong>
                </li>
              </ul>
            </td>
            <td colspan="2">
              <div class="data-top">
                <div class="data-top__item">
                  {{ getDatetime(item._doc.DateTimeIn, "date") }}
                </div>
                <div class="data-top__item">
                  {{ getDatetime(item._doc.DateTimeIn, "time") }}
                </div>
              </div>
              <div class="data-bottom">
                <ImageZoom
                  v-if="item._doc.ImageUrlIn != null"
                  :regular="item._doc.ImageUrlIn"
                  :zoom="item._doc.ImageUrlIn"
                  :zoom-amount="2"
                  :click-zoom="true"
                >
                  <img :src="item._doc.ImageUrlIn" alt="" />
                </ImageZoom>
                <div v-else>Không có</div>
              </div>
            </td>
            <td colspan="2">
              <div class="data-top">
                <div class="data-top__item">
                  {{ getDatetime(item._doc.DateTimeOut, "date") }}
                </div>
                <div class="data-top__item">
                  {{ getDatetime(item._doc.DateTimeOut, "time") }}
                </div>
              </div>
              <div class="data-bottom">
                <ImageZoom
                  v-if="item._doc.ImageUrlOut != null"
                  :regular="item._doc.ImageUrlOut"
                  :zoom="item._doc.ImageUrlOut"
                  :zoom-amount="2"
                  :click-zoom="true"
                >
                  <img :src="item._doc.ImageUrlOut" alt="" />
                </ImageZoom>
                <div v-else>Không có</div>
              </div>
            </td>
            <td>{{ item._doc.RootCause }}</td>
            <td>{{ item._doc.ActionNote }}</td>
            <td class="td-handle">
              <div class="row-handle-group">
                <div
                  class="btn-handle"
                  data-action="o-pop"
                  @click="
                    openEdit(
                      item._doc._id,
                      item._doc.RootCause,
                      item._doc.ActionNote
                    )
                  "
                >
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
      <table class="table table-bordered" ref="myTable" style="display:none">
        <thead class="thead-light">
          <tr>
            <th scope="col" colspan="20" rowspan="1" style="">Chi tiết dữ liệu xe từ {{ getDatetime(startDateTime, "datetime") }} đến {{ getDatetime(endDateTime, "datetime") }}</th>
          </tr>
          <tr>
            <th colspan="1" rowspan="1" style="vertical-align: middle ;font-weight:bold">No</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Type</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Ford Card ID</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Full name</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">CDSID</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Department</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Vehicle Datetime In</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Vehicle Datetime Out</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Vehicle Image In</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Vehicle Image Out</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Security confirmation</th>
            <th colspan="1" rowspan="1" style="vertical-align: middle;font-weight:bold">Note/Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in this.data" :key="item._doc._id">
            <td style="vertical-align: middle; text-align: center">
              {{ key }}
            </td>
            <td ></td>
            <td >{{ item._doc.FordCardIDIn }}</td>
            <td >{{ item._doc.FullNameIn }}</td>
            <td >{{ item._doc.CdsidIn }}</td>
            <td >{{ item._doc.DepartmentIn }}</td>
            <td>
              {{ getDatetime(item._doc.DateTimeIn, "datetime") }}
            </td>
            <td>
              {{ getDatetime(item._doc.DateTimeOut, "datetime") }}
            </td>
            <td>{{item._doc.ImageUrlIn}}</td>
            <td>{{item._doc.ImageUrlOut}}</td>
            <td>{{ item._doc.RootCause }}</td>
            <td>{{ item._doc.ActionNote }}</td>
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
import { VueImageZoomer as ImageZoom } from "vue-image-zoomer";
import ReportEdit from "@/views/modals/ReportEdit";
import XLSX from 'xlsx';

export default {
  components: { ImageZoom, ReportEdit },
  data() {
    return {
      data: [],
      fordCardID:null,
      fullName:null,
      cdsid:null,
      department:null,
      departmentOptions:[],
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
  created() {
    this.searchData();
    this.getDataDefault();
  },
  methods: {
    exportToExcel() {
      const table = this.$refs.myTable;
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `${this.getDatetime(new Date(), "file")}.xlsx`);
    },
    async openEdit(pkid, confirm, note) {
      try {
        const result = await this.$refs.popup.open(pkid, confirm, note);
        if (result) {
          this.searchData();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async getDataDefault(){
      
      const response = await api.post("/data/getdepartmentdata");
      this.departmentOptions = response.data.data.map((option) => ({
          value: option,
          label: option
      }));
    },
    async searchData() {
      const response = await api.post("/data/getreportdata", { 
        fordCardID:this.fordCardID,
        fullName:this.fullName,
        cdsid : this.cdsid,
        department : this.department,
        startDateTime:this.startDateTime,
        endDateTime:this.endDateTime
      });
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
      } else if(type=="time") {
        return `${hours}:${minutes}:${seconds}`;
      }else if(type=="file"){
        return `${hours}_${minutes}_${seconds}_${year}_${month}_${day}`;
      }
      else{
        return `'${hours}:${minutes}:${seconds} ${year}/${month}/${day}`;
      }
    },
  },
};
</script>
