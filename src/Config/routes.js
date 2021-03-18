import { Home, SignUp, LogIn, EventList } from "../Pages";

const routes = [
  { path: "/signup", component: SignUp },
  { path: "/login", component: LogIn },
  { path: "/manage-event/event-list", component: EventList },
  { path: "/", component: Home },
];

export default routes;
