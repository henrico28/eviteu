import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-navbar {
    padding: 5px 10px 5px 10px;

    .navbar-menu {
      color: var(--indigo);
    }

    @media only screen and (max-width: 600px) {
      .navbar-menu {
        margin: 15px 10px 5px 10px;
      }
    }

    @media only screen and (min-width: 800px) {
      .navbar-menu:hover {
        color: var(--white);
        background-color: var(--indigo);
      }
    }
  }
`;
