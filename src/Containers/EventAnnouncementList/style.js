import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-event-announcement-list {
    overflow: hidden;

    .event-announcement-list-back-button {
      left: 0;
      top: 0;
      margin: 10px 0px 0px 10px;
      z-index: 99;
    }

    .wrapper-event-annoucement-list-highlight {
      height: 40vh;
    }

    .wrapper-event-announcement-list-announcement {
      min-height: 75vh;

      .event-announcement-list-announcement {
        min-height: 30vh;
        cursor: pointer;
      }
    }

    @media only screen and (max-width: 600px) {
      .event-announcement-list-title {
        font-size: 36px;
      }

      .wrapper-event-announcement-list-contacts {
        height: 15vh;
      }

      .event-announcement-list-description-title {
        font-size: 18px;
      }

      .event-announcement-list-text {
        font-size: 14px;
      }
    }

    @media only screen and (min-width: 800px) {
      .event-announcement-list-title {
        font-size: 48px;
      }

      .wrapper-event-announcement-list-contacts {
        height: 7vh;
      }

      .event-announcement-list-description-title {
        font-size: 24px;
      }

      .event-announcement-list-text {
        font-size: 16px;
      }
    }
  }
`;
