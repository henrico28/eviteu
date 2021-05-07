import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-event-announcement-detail {
    overflow: hidden;

    .event-announcement-detail-back-button {
      left: 0;
      top: 0;
      margin: 10px 0px 0px 10px;
      z-index: 99;
    }

    .wrapper-event-announcement-detail-highlight {
      height: 40vh;
    }

    .wrapper-event-announcement-detail-announcement {
      min-height: 45vh;
    }

    @media only screen and (max-width: 600px) {
      .event-announcement-detail-title {
        font-size: 36px;
      }

      .wrapper-event-announcement-detail-contacts {
        height: 15vh;
      }

      .event-announcement-detail-description-title {
        font-size: 18px;
      }

      .event-announcement-detail-text {
        font-size: 14px;
      }
    }

    @media only screen and (min-width: 800px) {
      .event-announcement-detail-title {
        font-size: 48px;
      }

      .wrapper-event-announcement-detail-contacts {
        height: 7vh;
      }

      .event-announcement-detail-description-title {
        font-size: 24px;
      }

      .event-announcement-detail-text {
        font-size: 16px;
      }
    }
  }
`;
