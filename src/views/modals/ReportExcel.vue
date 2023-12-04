<template>
    <VXETable
      :data="tableData"
      ref="table"
      border
      show-overflow
      resizable
      highlight-hover-row
      highlight-current-row
      highlight-current-column
      :edit-config="{ trigger: 'click', mode: 'row' }"
    >
      <vxe-table-column type="index" title="#" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="150"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="200"></vxe-table-column>
      <vxe-table-column field="customField" title="Custom Field" width="150">
        <!-- Tùy chỉnh ô cell bằng cách sử dụng scoped slot -->
        <template v-slot="scope">
          <span @click="handleCellClick(scope.row, scope.column)">{{ scope.row.customField }}</span>
        </template>
      </vxe-table-column>
    </VXETable>
    <button @click="exportToExcel">Export to Excel</button>
  </template>
  
  <script>
  import VXETable from 'vxe-table'
  import 'vxe-table/lib/style.css'
  export default {
    components:{
        VXETable
    },
    data() {
      return {
        tableData: [
          { name: 'John Doe', age: 28, address: '123 Main St', customField: 'Custom Data 1' },
          // Add more data as needed
        ]
      };
    },
    methods: {
        exportToExcel() {
      // Xuất Excel
      this.$refs.table.exportDataToExcel({ filename: 'excel-export' });
    },
      handleCellClick(row, column) {
        // Xử lý khi ô cell được click
        console.log('Cell Clicked:', row, column);
      }
    }
  };
  </script>
  
  <style>
  /* Thêm CSS tùy chỉnh nếu cần */
  </style>
  