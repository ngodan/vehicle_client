export function checkIfUserIsAuthenticated() {
    // Thực hiện kiểm tra xác thực của người dùng ở đây
    // Ví dụ, kiểm tra xem token đã được lưu trong localStorage hay không
    const token = localStorage.getItem('token');
  
    // Trả về true nếu người dùng đã đăng nhập, ngược lại trả về false
    return !!token; // Trả về true nếu token tồn tại, ngược lại trả về false
}
export function getUserRole(){
    return localStorage.getItem("role")
}