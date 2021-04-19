import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-announcement-list {
    min-height: 85vh;
    margin: 10px 8px 8px 8px;
    background-color: var(--white);

    .announcement-list-title {
      font-size: 16px;
    }

    .announcement-list-event-select {
      width: 50%;
    }

    .wrapper-announcement-list-search {
      display: flex;
      justify-content: flex-end;
      .announcement-list-search-input {
        width: 60%;
      }
    }
  }
`;
