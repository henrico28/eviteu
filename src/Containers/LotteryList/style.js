import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-lottery-list {
    min-height: 85vh;
    margin: 10px 8px 8px 8px;
    background-color: var(--white);

    .lottery-list-title {
      font-size: 16px;
    }

    .wrapper-lottery-list-search {
      display: flex;
      justify-content: flex-end;
      .lottery-list-search-input {
        width: 60%;
      }
    }
  }
`;
