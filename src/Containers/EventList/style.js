import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-event-list {
    min-height: 85vh;
    margin: 10px 8px 8px 8px;
    background-color: var(--white);

    .event-list-title {
      font-size: 16px;
    }

    .wrapper-event-list-search {
      display: flex;
      justify-content: flex-end;
      .event-list-search-input {
        width: 60%;
      }
    }
  }
`;
