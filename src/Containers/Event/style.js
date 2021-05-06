import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-event {
    overflow: hidden;

    .event-logout-button {
      right: 0;
      top: 5;
      margin: 10px 10px 0px 0px;
      z-index: 99;
    }

    .wrapper-event-highlight {
      background-repeat: no-repeat;
      opacity: 0.8;
    }

    .wrapper-event-content {
      height: 40vh;
    }

    .wrapper-location-display {
      height: inherit;
    }

    .event-no-content {
      height: 20vh;
      margin-top: -20px;
    }

    @media only screen and (max-width: 600px) {
      .wrapper-event-highlight {
        background-size: 150%;
        height: 45vh;
      }

      .event-title {
        font-size: 36px;
      }

      .event-subtitle {
        font-size: 28px;
      }

      .event-description-title {
        font-size: 18px;
      }

      .event-text {
        font-size: 14px;
        text-align: center;
      }

      .wrapper-event-content {
        margin-top: 20px;
      }

      .wrapper-location-display {
        display: none;
      }
    }

    @media only screen and (min-width: 800px) {
      .wrapper-event-highlight {
        background-size: 100%;
        height: 70vh;
      }

      .event-title {
        font-size: 48px;
      }

      .event-subtitle {
        font-size: 40px;
      }

      .event-description-title {
        font-size: 24px;
      }

      .event-text {
        font-size: 16px;
      }
    }
  }
`;
