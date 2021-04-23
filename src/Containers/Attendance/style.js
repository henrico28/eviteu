import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-attendance {
    min-height: 85vh;
    margin: 10px 8px 8px 8px;
    background-color: var(--white);

    .attendance-title {
      font-size: 16px;
    }

    .attendance-button {
      width: 80%;
    }

    .wrapper-attendance-search {
      display: flex;
      justify-content: flex-end;
      .attendance-search-input {
        width: 60%;
      }
    }
  }
`;
