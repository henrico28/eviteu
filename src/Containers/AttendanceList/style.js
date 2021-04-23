import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-attendance-list {
    min-height: 85vh;
    margin: 10px 8px 8px 8px;
    background-color: var(--white);

    .attendance-list-title {
      font-size: 16px;
    }

    .wrapper-attendance-list-search {
      display: flex;
      justify-content: flex-end;
      .attendance-list-search-input {
        width: 60%;
      }
    }
  }
`;
