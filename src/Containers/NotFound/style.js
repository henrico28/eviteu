import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-notfound {
    .notfound-illustration {
      width: 50%;
      height: auto;
    }

    @media only screen and (max-width: 600px) {
      .notfound-text {
        font-size: 24px;
      }
    }

    media only screen and (min-width: 800px) {
      .notfound-text {
        font-size: 30px;
      }
    }
  }
`;
