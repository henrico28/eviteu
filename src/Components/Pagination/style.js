import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-pagination {
    .pagination-button {
      color: var(--indigo);

      &.active {
        background-color: var(--indigo);
        color: var(--white);
        border-color: var(--indigo);
        cursor: default;
      }
    }
  }
`;
