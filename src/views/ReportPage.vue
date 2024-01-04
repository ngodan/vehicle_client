<template>
  <ReportEdit ref="popup"></ReportEdit>
  <div class="layout-area p-20">
    <a href="/" class="btn btn-primary btn-back">Quay về trang chủ </a>
    <div class="layout-title">BÁO CÁO CUỐI CA HỆ THỐNG QUẢN LÝ XE TỰ ĐỘNG</div>
    <div class="layout-description">Ca: {{ vehicleCount.shift }} | Xe vào: <strong>{{vehicleCount.countVehicleWithNullOut}} </strong> | Xe ra: <strong>{{vehicleCount.countVehicleWithNotNullOut}} </strong></div>
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
        <div class="form-group col-sm-1">
          <label for="">Bộ phận</label>
          <select
            class="form-control"
            name="department"
            v-model="department"
            id=""
          >
            <option value="" selected>Chọn bộ phận</option>
            <option v-for="option in departmentOptions" :key="option.value">
              {{ option.label }}
            </option>
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
        <div class="form-group col-sm-1">
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
        <div class="form-group col-sm-1">
          <label for="">Ford card ID</label>
          <input
            type="text"
            class="form-control"
            name="fordCardID"
            id=""
            aria-describedby="helpId"
            placeholder="Nhập Ford ID"
            v-model="fordCardID"
          />
        </div>
        <div class="form-group col-sm-1">
          <label for="">Dạng dữ liệu</label>
          <select class="form-control" name="department" v-model="status" id="">
            <option value="NOK" selected>NOK</option>
            <option value="OK">OK</option>
            <option value="ALL">Tất cả</option>
          </select>
        </div>
        <div class="form-group col-sm-1">
          <label for="">Dạng hành động</label>
          <select class="form-control" name="department" v-model="check" id="">
            <option value="2">Hậu kiểm</option>
            <option value="1">Đã kiểm</option>
            <option value="0">Tất cả</option>
          </select>
        </div>
      </div>
      <div class="filter-action col-sm-2">
        <button
          class="btn btn-primary"
          @click="searchData"
          style="margin-right: 10px"
          :disabled="isDisable"
        >
          Tìm kiếm
        </button>
        <button
          class="btn btn-primary"
          @click="exportToExcel"
          style="margin-right: 10px"
          :disabled="isDisable"
        >
          Xuất excel
        </button>
        <button
          class="btn btn-primary"
          @click="sendMail"
          style="margin-right: 10px"
          :disabled="isDisable"
        >
          Gửi mail
        </button>
      </div>
    </div>
    <div class="layout-content">
      <div v-if="loading" class="loading-indicator">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <table class="table table-bordered table-main">
        <thead class="thead-light">
          <tr>
            <th colspan="1" rowspan="2" style="width: 3%">STT</th>
            <th colspan="3" rowspan="1" style="width: 25%">Thông tin vào</th>
            <th colspan="3" rowspan="1" style="width: 25%">Thông tin ra</th>
            <th colspan="1" rowspan="2" style="width: 9%">Loại lỗi</th>
            <th colspan="1" rowspan="2" style="width: 18%">Mô tả cụ thể lỗi</th>
            <th colspan="1" rowspan="2" style="width: 18%">Hành động</th>
            <th colspan="1" rowspan="2" style="width: 5%">Thao tác</th>
          </tr>
          <tr>
            <th scope="col" style="width: 7%">Thông tin nhân viên</th>
            <th scope="col" style="width: 9%">Ngày</th>
            <th scope="col" style="width: 9%">Giờ</th>
            <th scope="col" style="width: 7%">Thông tin nhân viên</th>
            <th scope="col" style="width: 9%">Ngày</th>
            <th scope="col" style="width: 9%">Giờ</th>
          </tr>
        </thead>

        <tbody v-if="!loading">
          <tr v-for="(item, key) in this.data" :key="item._doc._id">
            <td
              scope="row"
              style="vertical-align: middle; text-align: center; width: 3%"
            >
              {{ key + 1 }}
            </td>
            <td colspan="2" style="width: 25%; padding: 0px">
              <div class="grid-data">
                <div class="data-infor">
                  <ul>
                    <li>
                      Ford Card ID:<strong>{{
                        item._doc.FordCardIDIn
                          ? item._doc.FordCardIDIn
                          : "Không có"
                      }}</strong>
                    </li>
                    <li>
                      CDSID:
                      <strong>{{
                        item._doc.FordCardIDIn ? item._doc.CdsidIn : "Không có"
                      }}</strong>
                    </li>
                    <li>
                      Full name:
                      <strong>{{
                        item._doc.FordCardIDIn
                          ? item._doc.FullNameIn
                          : "Không có"
                      }}</strong>
                    </li>
                    <li>
                      Department:
                      <strong>{{
                        item._doc.FordCardIDIn
                          ? item._doc.DepartmentIn
                          : "Không có"
                      }}</strong>
                    </li>
                    <li>
                      License Plate:
                      <strong>{{
                        item._doc.LicensePlateIn
                          ? item._doc.LicensePlateIn
                          : "Không có"
                      }}</strong>
                    </li>
                  </ul>
                </div>
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
                    v-if="item._doc.ImageIn != null"
                    :regular="item._doc.ImageIn"
                    :zoom="item._doc.ImageIn"
                    :zoom-amount="2"
                    :click-zoom="true"
                  >
                    <img :src="item._doc.ImageIn" alt="" />
                  </ImageZoom>
                  <div v-else>Không có</div>
                </div>
              </div>
            </td>
            <td colspan="2" style="width: 25%; padding: 0px">
              <div class="grid-data">
                <div class="data-infor">
                  <ul>
                    <li>
                      Ford Card ID:<strong>{{
                        item._doc.FordCardIDOut
                          ? item._doc.FordCardIDOut
                          : "Không có"
                      }}</strong>
                    </li>
                    <li>
                      CDSID:
                      <strong>{{
                        item._doc.FordCardIDOut
                          ? item._doc.CdsidOut
                          : "Không có"
                      }}</strong>
                    </li>
                    <li>
                      Full name:
                      <strong>{{
                        item._doc.FordCardIDOut
                          ? item._doc.FullNameOut
                          : "Không có"
                      }}</strong>
                    </li>
                    <li>
                      Department:
                      <strong>{{
                        item._doc.FordCardIDOut
                          ? item._doc.DepartmentOut
                          : "Không có"
                      }}</strong>
                    </li>
                    <li>
                      License Plate:
                      <strong>{{
                        item._doc.LicensePlateOut
                          ? item._doc.LicensePlateOut
                          : "Không có"
                      }}</strong>
                    </li>
                  </ul>
                </div>
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
                    v-if="item._doc.ImageOut != null"
                    :regular="item._doc.ImageOut"
                    :zoom="item._doc.ImageOut"
                    :zoom-amount="2"
                    :click-zoom="true"
                  >
                    <img :src="item._doc.ImageOut" alt="" />
                  </ImageZoom>
                  <div v-else>Không có</div>
                </div>
              </div>
            </td>
            <td style="width: 9%">{{ item._doc.TypeOfError }}</td>
            <td style="width: 18%">{{ item._doc.Rootcause }}</td>
            <td style="width: 18%">{{ item._doc.Action }}</td>
            <td
              class="td-handle"
              style="vertical-align: middle; text-align: center; width: 5%"
            >
              <div class="row-handle-group">
                <div
                  class="btn-handle"
                  data-action="o-pop"
                  @click="
                    openEdit(
                      item._doc._id,
                      item._doc.Rootcause,
                      item._doc.Action,
                      item._doc.Status,
                      item._doc.TypeOfError
                    )
                  "
                >
                  <i class="fi fi-rr-edit" style="color: blue"></i>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <p>
          <strong>Có {{ totalRecords }} dữ liệu được tìm thấy</strong>
        </p>
      </table>
      <table class="table table-bordered" ref="myTable" style="display: none">
        <thead class="thead-light">
          <tr>
            <th scope="col" colspan="20" rowspan="1" style="">
              Chi tiết dữ liệu xe từ
              {{ getDatetime(startDateTime, "datetime") }} đến
              {{ getDatetime(endDateTime, "datetime") }}
            </th>
          </tr>
          <tr>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              No
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Type
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Ford Card ID
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Full name
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              CDSID
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Department
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Vehicle Datetime In
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Vehicle Datetime Out
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Vehicle Image In
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Vehicle Image Out
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Security confirmation
            </th>
            <th
              colspan="1"
              rowspan="1"
              style="vertical-align: middle; font-weight: bold"
            >
              Note/Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in this.data" :key="item._doc._id">
            <td style="vertical-align: middle; text-align: center">
              {{ key }}
            </td>
            <td>{{ item._doc.TypeOfError }}</td>
            <td>{{ item._doc.FordCardIDIn }}</td>
            <td>{{ item._doc.FullNameIn }}</td>
            <td>{{ item._doc.CdsidIn }}</td>
            <td>{{ item._doc.DepartmentIn }}</td>
            <td>
              {{ getDatetime(item._doc.DateTimeIn, "datetime") }}
            </td>
            <td>
              {{ getDatetime(item._doc.DateTimeOut, "datetime") }}
            </td>
            <td>{{ item._doc.ImageIn }}</td>
            <td>{{ item._doc.ImageOut }}</td>
            <td>{{ item._doc.Rootcause }}</td>
            <td>{{ item._doc.Action }}</td>
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
import XLSX from "xlsx";
import io from "socket.io-client";
import { serverIP } from "@/configs/configDefault";
export default {
  components: { ImageZoom, ReportEdit },
  data() {
    return {
      data: [],
      fordCardID: null,
      fullName: null,
      cdsid: null,
      department: "",
      departmentOptions: [],
      status: "NOK",
      check: 2,
      totalRecords: 0,
      loading: false,
      isDisable: false,
      vehicleCount : {
        countVehicleWithNullOut : 0,
        countVehicleWithNotNullOut : 0,
        shift : 1
       } ,
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
    this.connectSocket();
  },
  methods: {
    async sendMail() {
      try {
        this.isDisable = true;
        this.loading = true;
        const response = await api.post("/data/sendmail", {
          fordCardID: this.fordCardID,
          fullName: this.fullName,
          cdsid: this.cdsid,
          department: this.department,
          startDateTime: this.startDateTime,
          endDateTime: this.endDateTime,
          status: this.status,
          check: this.check,
        });
        if (response.status == 200) {
          alert("Gửi thành công");
        } else {
          alert("Gửi không thành công,vui lòng gửi lại");
        }
        this.isDisable = false;
      } catch {
        this.isDisable = false;
      } finally {
        this.isDisable = false;
        this.loading = false;
      }
    },
    exportToExcel() {
      this.isDisable = true;
      this.loading = true;
      const table = this.$refs.myTable;
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `${this.getDatetime(new Date(), "file")}.xlsx`);
      this.isDisable = false;
      this.loading = false;
    },
    async openEdit(pkid, confirm, note, status, typeError) {
      try {
        const result = await this.$refs.popup.open(
          pkid,
          confirm,
          note,
          status,
          typeError
        );
        if (result) {
          this.searchData();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async getDataDefault() {
      const response = await api.post("/data/getdepartmentdata");
      this.departmentOptions = response.data.data.map((option) => ({
        value: option,
        label: option,
      }));
    },
    async searchData() {
      this.isDisable = true;
      this.loading = true;
      try {
        const response = await api.post("/data/getreportdata", {
          fordCardID: this.fordCardID,
          fullName: this.fullName,
          cdsid: this.cdsid,
          department: this.department,
          startDateTime: this.startDateTime,
          endDateTime: this.endDateTime,
          status: this.status,
          check: this.check,
        });
        if (response.status == 200) {
          this.data = response.data.data;
          this.totalRecords = this.data.length;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false; // Kết thúc loading, dù có lỗi hay không
        this.isDisable = false;
      }
    },
    getDatetime(dateTimeString, type) {
      if (dateTimeString == null) {
        return "Không có";
      }

      // Sử dụng moment.utc thay vì moment
      const date = moment.utc(dateTimeString);

      const formattedDate = date.format("YYYY-MM-DD");
      const formattedTime = date.format("HH:mm:ss");
      const formattedFile = date.format("HH_mm_ss_YYYY_MM_DD");
      const formattedDateTime = date.format("HH:mm:ss YYYY/MM/DD");

      if (type == "date") {
        return formattedDate;
      } else if (type == "time") {
        return formattedTime;
      } else if (type == "file") {
        return formattedFile;
      } else {
        return formattedDateTime;
      }
    },
    connectSocket() {
      const socket = io(serverIP);
      socket.on("vehicleData", (data) => {
        if(data != null ){
          console.log(data)
          this.vehicleCount = data
        }
      });
      socket.emit("getData");
    },
    // getDatetime(dateTimeString, type) {
    //   const date = new Date(dateTimeString);
    //   if (dateTimeString == null) {
    //     return "Không có";
    //   }
    //   const year = date.getFullYear();
    //   const month = String(date.getMonth() + 1).padStart(2, "0");
    //   const day = String(date.getDate()).padStart(2, "0");
    //   const hours = String(date.getHours()).padStart(2, "0");
    //   const minutes = String(date.getMinutes()).padStart(2, "0");
    //   const seconds = String(date.getSeconds()).padStart(2, "0");

    //   if (type == "date") {
    //     return `${year}-${month}-${day}`;
    //   } else if (type == "time") {
    //     return `${hours}:${minutes}:${seconds}`;
    //   } else if (type == "file") {
    //     return `${hours}_${minutes}_${seconds}_${year}_${month}_${day}`;
    //   } else {
    //     return `'${hours}:${minutes}:${seconds} ${year}/${month}/${day}`;
    //   }
    // },
  },
};
</script>
