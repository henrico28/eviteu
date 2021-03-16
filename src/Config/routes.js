import { Home, SignUp, LogIn } from "../Pages";

const routes = [
  { path: "/signup", component: SignUp },
  { path: "/login", component: LogIn },
  { path: "/", component: Home },
];

export default routes;
