import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-signup {
    background-color: var(--indigo);

    .signup-title {
      background-color: var(--indigo);
    }

    .signup-button {
      color: var(--white);
      background-color: var(--indigo);

      &.button-hide {
        width: 45px;
      }
    }

    .signup-button:hover {
      background-color: #570ecc;
    }

    .signup-back-button {
      right: 0;
      top: 0;
      z-index: 10;
    }
  }
`;
