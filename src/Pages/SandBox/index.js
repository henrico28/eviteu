import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const SandBox = (props) => {
  const [data, setData] = useState([
    { idCommittee: 8, userName: "Olivia Baker", status: 1 },
    { idCommittee: 9, userName: "Annie Brooks", status: 0 },
    { idCommittee: 10, userName: "Henrico Leodra", status: 0 },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const assignedCommittee = [];
    data.forEach((committee) => {
      if (committee.status) {
        assignedCommittee.push(committee.idCommittee);
      }
    });
    console.log(assignedCommittee);
  };

  const handleChange = (index) => {
    const newData = [...data];
    newData[index].status = newData[index].status === 1 ? 0 : 1;
    setData(newData);
  };

  const renderData = () => {
    return (
      <>
        {data.map((committee, idx) => {
          return (
            <FormGroup key={committee.idCommittee} check>
              <Label check>
                <Input
                  type="checkbox"
                  value={committee.idCommittee}
                  defaultChecked={committee.status === 1}
                  onChange={() => {
                    handleChange(idx);
                  }}
                />{" "}
                {committee.userName}
              </Label>
            </FormGroup>
          );
        })}
      </>
    );
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        {renderData()}
        <div>
          <Button className="btn-indigo">Submit</Button>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default SandBox;
