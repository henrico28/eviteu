import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-error {
    @media only screen and (max-width: 600px) {
      .error-text {
        font-size: 24px;
      }

      .error-subtext {
        font-size: 18px;
      }
    }

    media only screen and (min-width: 800px) {
      .error-text {
        font-size: 30px;
      }

      .error-subtext {
        font-size: 24px;
      }
    }
  }
`;
