import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-dashboard-header {
    padding: 10px 10px 10px 10px;

    @media only screen and (max-width: 600px) {
      .wrapper-header-button {
        display: flex;
        justify-content: flex-end;
      }

      .wrapper-header-user {
        display: none;
      }
    }

    @media only screen and (min-width: 800px) {
      .wrapper-header-logo {
        display: none;
      }
    }

    .wrapper-header-button {
      .header-button {
        width: 45px;
      }
    }
  }
`;
