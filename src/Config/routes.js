import {
  Home,
  SignUp,
  LogIn,
  EventList,
  AddEvent,
  EditEvent,
  SandBox,
} from "../Pages";

const routes = [
  { path: "/signup", component: SignUp },
  { path: "/login", component: LogIn },
  { path: "/manage-event/event-list", component: EventList },
  { path: "/manage-event/add-event", component: AddEvent },
  { path: "/manage-event/edit-event/:id", component: EditEvent },
  { path: "/sandbox", component: SandBox },
  { path: "/", component: Home },
];

export default routes;
