import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-footer {
    overflow-x: hidden;
    background-color: var(--indigo);
    padding: 8px;

    @media only screen and (max-width: 600px) {
      .footer-text {
        font-size: 12px;
      }
    }

    @media only screen and (min-width: 800px) {
      .footer-text {
        font-size: 16px;
      }
    }
  }
`;
