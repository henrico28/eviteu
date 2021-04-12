import React, { useState } from "react";
import { Pagination } from "../../Components";

const SandBox = (props) => {
  const [page, setPage] = useState(1);

  return (
    <React.Fragment>
      <Pagination
        currentPage={page}
        totalData={30}
        dataPerPage={6}
        setPage={setPage}
      />
    </React.Fragment>
  );
};

export default SandBox;
