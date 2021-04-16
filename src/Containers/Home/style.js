import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-home {
    .wrapper-content {
      min-height: 90vh;
    }

    .home-illustration {
      width: 80%;
      height: auto;
    }

    @media only screen and (max-width: 600px) {
      .home-illustration {
        margin: -60px 0 -60px 0;
      }
    }

    .home-description {
      @media only screen and (max-width: 600px) {
        .description-title {
          color: var(--purple);
          font-size: 24px;
          text-align: center;
        }

        .description-text {
          color: var(--indigo);
          font-size: 16px;
          text-align: center;
        }

        .wrapper-description-button {
          display: flex;
          justify-content: center;
        }
      }

      @media only screen and (min-width: 800px) {
        .description-title {
          color: var(--purple);
          font-size: 30px;
        }

        .description-text {
          color: var(--indigo);
          font-size: 18px;
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .wrapper-home {
      margin-bottom: 70px;
    }
  }
`;
