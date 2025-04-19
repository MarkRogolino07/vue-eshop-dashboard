import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../views/ProductList.vue";
import AddProduct from "../views/AddProduct.vue";
import EditProduct from "../views/EditProduct.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: ProductList },
    { path: "/add", component: AddProduct },
    { path: "/edit/:id", component: EditProduct, props: true },
  ],
});

export default router;
