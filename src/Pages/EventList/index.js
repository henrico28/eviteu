import React, { useState } from "react";
import { LayoutManageEvent, EventList } from "../../Containers";

const EventListPage = (props) => {
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [data, setData] = useState([]);

  return (
    <LayoutManageEvent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      page={"event-list"}
      title={"Event"}
    >
      <EventList data={data} />
    </LayoutManageEvent>
  );
};

export default EventListPage;
