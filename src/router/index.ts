// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import EShopDashboard from "@/components/EShopDashboard.vue";
import ProductForm from "@/components/ProductForm.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: EShopDashboard,
    meta: { title: "Dashboard" },
  },
  {
    path: "/products/create",
    component: ProductForm,
    meta: { title: "Create Product" },
  },
  {
    path: "/products/edit/:id",
    component: ProductForm,
    props: true,
    meta: { title: "Edit Product" },
  },
  // Add a catch-all route for 404s
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Optional: Update document title when route changes
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | E-Shop` : "E-Shop";
  next();
});

export default router;
