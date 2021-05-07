import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-qr-scan-attendance {
    .qr-scan-attendance-back-button {
      margin-top: 10px;
    }

    @media only screen and (max-width: 600px) {
      .qr-scan-attendance-title {
        font-size: 32px;
      }
    }

    @media only screen and (min-width: 800px) {
      .qr-scan-attendance-title {
        font-size: 40px;
      }
    }
  }
`;
