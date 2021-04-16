import {
  Home,
  SignUp,
  LogIn,
  EventList,
  AddEvent,
  EditEvent,
  CommitteeList,
  SandBox,
} from "../Pages";

const routes = [
  { path: "/signup", component: SignUp },
  { path: "/login", component: LogIn },
  { path: "/manage-event/event-list", component: EventList },
  { path: "/manage-event/add-event", component: AddEvent },
  { path: "/manage-event/edit-event/:id", component: EditEvent },
  { path: "/manage-event/committee-list", component: CommitteeList },
  { path: "/sandbox", component: SandBox },
  { path: "/", component: Home },
];

export default routes;
