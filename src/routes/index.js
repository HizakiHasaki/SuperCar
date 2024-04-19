import { UserLayout } from "~/components/Layouts";
import { Cart, Contact, Home, ProductDetail, Profile } from "~/pages";

const publicRoutes = [
  { path: "/", component: Home, layout: UserLayout },
  {
    path: "/product/:id",
    component: ProductDetail,
    layout: UserLayout,
  },
  {
    path: "/cart",
    component: Cart,
    layout: UserLayout,
  },
  {
    path: "/profile",
    component: Profile,
    layout: UserLayout,
  },
  {
    path: "/contact",
    component: Contact,
    layout: UserLayout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
