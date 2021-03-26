import React, { useState } from "react";
import { LayoutManageEvent, EventList } from "../../Containers";

const EventListPage = (props) => {
  let [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);

  return (
    <LayoutManageEvent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      page={"event-list"}
      title={"Event"}
    >
      <EventList />
    </LayoutManageEvent>
  );
};

export default EventListPage;
