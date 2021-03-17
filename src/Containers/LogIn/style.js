import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-login {
    .wrapper-login-title {
      background-color: var(--indigo);
      height: 400px;

      .login-title {
        font-size: 70px;
      }
    }

    @media only screen and (max-width: 600px) {
      .wrapper-login-title {
        height: 250px;
        margin-bottom: -50px;

        .login-title {
          font-size: 40px;
        }
      }
    }

    .login-button-hide {
      width: 45px;
    }

    .login-back-button {
      right: 0;
      top: 0;

      color: var(--indigo);
    }
  }
`;
