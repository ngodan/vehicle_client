
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import ReportPage from '@/views/ReportPage.vue';
import UserPage from '@/views/UserPage.vue';
import TestPage from '@/views/TestPage.vue';
import Test2Page from '@/views/Test2Page.vue';
import { checkIfUserIsAuthenticated,getUserRole } from '@/authentication/authCheck'; // Thay đổi đường dẫn tương ứng

const routes = [
  { path: '/', 
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  { path: '/test', 
    component: TestPage,
  },
  { path: '/test2', 
    component: Test2Page,
  },
  {
    path: '/report',
    component: ReportPage,
    meta: { requiresAuth: true, requiresAdmin: true }, // Đánh dấu route này yêu cầu xác thực và quyền admin
  },
  {
    path: '/user',
    component: UserPage,
    meta: { requiresAuth: true, requiresAdmin: true }, // Đánh dấu route này yêu cầu xác thực và quyền admin
  },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = checkIfUserIsAuthenticated();

    if (!isAuthenticated) {
      next('/login');
    } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
      // Kiểm tra quyền người dùng
      // Ví dụ: Nếu quyền là 'admin', cho phép truy cập, ngược lại chuyển hướng điều hướng khác
      const userRole = getUserRole(); // Lấy quyền người dùng từ cơ sở dữ liệu hoặc nơi lưu trữ

      if (userRole === 'admin') {
        next();
      } else {
        next('/'); // Chuyển hướng tới một route khác nếu không có quyền admin
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router; // Xuất router như một default export
