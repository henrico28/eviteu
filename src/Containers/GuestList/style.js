import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-guest-list {
    min-height: 85vh;
    margin: 10px 8px 8px 8px;
    background-color: var(--white);

    .guest-list-title {
      font-size: 16px;
    }

    .guest-list-event-select {
      width: 50%;
    }

    .wrapper-guest-list-search {
      display: flex;
      justify-content: flex-end;
      .guest-list-search-input {
        width: 70%;
      }
    }
  }
`;
