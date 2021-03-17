import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-profile {
    .wrapper-content {
      min-height: 90vh;
    }

    .profile-illustration {
      width: 80%;
      height: auto;
    }

    @media only screen and (max-width: 600px) {
      .profile-illustration {
        margin: -60px 0 -60px 0;
      }
    }

    .profile-description {
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
    .wrapper-profile {
      margin-bottom: 70px;
    }
  }
`;
