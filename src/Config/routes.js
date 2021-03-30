import { Home, SignUp, LogIn, EventList, AddEvent } from "../Pages";

const routes = [
  { path: "/signup", component: SignUp },
  { path: "/login", component: LogIn },
  { path: "/manage-event/event-list", component: EventList },
  { path: "/manage-event/add-event", component: AddEvent },
  { path: "/", component: Home },
];

export default routes;
