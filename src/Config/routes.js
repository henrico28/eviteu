import {
  Home,
  SignUp,
  LogIn,
  EventList,
  AddEvent,
  EditEvent,
  AssignCommittee,
  CommitteeList,
  AddCommittee,
  EditCommittee,
  SandBox,
} from "../Pages";

const routes = [
  { path: "/signup", component: SignUp },
  { path: "/login", component: LogIn },
  { path: "/manage-event/event-list", component: EventList },
  { path: "/manage-event/add-event", component: AddEvent },
  { path: "/manage-event/edit-event/:id", component: EditEvent },
  { path: "/manage-event/assign-committee/:id", component: AssignCommittee },
  { path: "/manage-event/committee-list", component: CommitteeList },
  { path: "/manage-event/add-committee", component: AddCommittee },
  { path: "/manage-event/edit-committee/:id", component: EditCommittee },
  { path: "/sandbox", component: SandBox },
  { path: "/", component: Home },
];

export default routes;
