<template>
    <div class="layout-area p-20">
        <div class="layout-title">Dữ liệu người dùng</div>
        <div class="layout-filter flex-wrap">
           <div class="filter-group flex-wrap col-sm-10">
                <div class="form-group col-sm-1">
                    <label for="">Quyền hạn</label>
                    <select class="form-control" name="" id="">
                        <option>Admin</option>
                        <option>User</option>
                    </select>
                </div>
           </div>
           <div class="filter-action col-sm-2">
                <div class="btn btn-primary">Tìm kiếm</div>
           </div>
        </div>
        <div class="layout-content">
            <table class="table table-bordered">
                <thead class="thead-light">
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Tài khoản</th>
                    <th scope="col">Mật khẩu</th>
                    <th scope="col">Loại tài khoản</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Ngô Viết Đàn</td>
                        <td>ngodan2409@gmail.com</td>
                        <td>ngodan2409</td>
                        <td class="hidetext">12345678</td>
                        <td>Admin</td>
                        <td class="td-handle">
                            <div class="row-handle-group">
                                <div class="btn-handle" data-action="o-pop">
                                    <i class="fi fi-rr-edit" style="color: blue;"></i>
                                </div>
                                <div class="btn-handle" data-action="c-pop">
                                    <i class="fi fi-rr-trash" style="color: red;"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="layout-popup">
            <div class="popup-status"></div>
            <div class="popup-content">
                <div class="popup-content__layout">
                    <div class="popup-content__layout--title align-center justify-between"  >
                        <h5>Chỉnh sửa và hiển thị</h5>
                        <div class="btn-handle" data-action="c-pop" style="margin-right:0px">
                            <i class="fi fi-rr-cross" style="color: black;"></i>
                        </div>
                    </div>
                    <div class="popup-content__layout--content">
                        <div class="layout--content__data flex-grap justify-between" style="margin-top:20px">
                            <div class="form-group col-sm-6">
                              <label for="">Họ và tên</label>
                              <input readonly type="text" name="" id="" class="form-control" value="Ngô Viết Đàn" aria-describedby="helpId">
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="">Email</label>
                                <input readonly type="text" name="" id="" class="form-control" value="ngodan2409@gmail.com"  aria-describedby="helpId">
                              </div>
                              <div class="form-group col-sm-6">
                                <label for="">Tài khoản</label>
                                <input readonly type="text" name="" id="" class="form-control" value="ngodan2409" aria-describedby="helpId">
                              </div>
                              <div class="form-group col-sm-6">
                                <label for="">Mật khẩu</label>
                                <input readonly type="text" name="" id="" class="form-control" value="12345678"  aria-describedby="helpId">
                              </div>
                              <div class="form-group col-sm-6">
                                <label for="">Kiểu tài khoản</label>
                                <input readonly type="text" name="" id="" class="form-control" value="Admin"  aria-describedby="helpId">
                              </div>
                        </div>
                        <div class="layout--content__action">
                            <div class="btn btn-primary">Lưu dữ liệu</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>