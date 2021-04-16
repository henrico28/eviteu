import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-committee-list {
    min-height: 85vh;
    margin: 10px 8px 8px 8px;
    background-color: var(--white);

    .committee-list-title {
      font-size: 16px;
    }

    .wrapper-committee-list-search {
      display: flex;
      justify-content: flex-end;
      .committee-list-search-input {
        width: 60%;
      }
    }
  }
`;
