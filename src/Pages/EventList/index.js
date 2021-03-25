import React, { useState } from "react";
import { LayoutManageEvent, EventList } from "../../Containers";
import useUserData from "../../LocalStorage/useUserData";

const EventListPage = (props) => {
  let [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  let { userData } = useUserData();

  return (
    <LayoutManageEvent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      page={"event-list"}
      title={"Event"}
      userName={userData.name}
    >
      <EventList />
    </LayoutManageEvent>
  );
};

export default EventListPage;
