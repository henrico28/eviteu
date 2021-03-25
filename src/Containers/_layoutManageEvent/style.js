import styled from "styled-components";

export const Wrapper = styled.div`
  @media only screen and (max-width: 600px) {
    .right {
      &.active {
        margin-left: 0px !important;
      }
    }
  }
  .right {
    background-color: #f3f3f4;
    margin-left: 0px;
    transition: all ease 0.3s;
    &.active {
      margin-left: 300px;
    }
  }
  .wrapper-title {
    background-color: var(--white);
  }
`;
