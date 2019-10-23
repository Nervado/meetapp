import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  font-family: Helvetica, sans-serif;

  max-width: 900px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  header {
    height: 142px;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      color: #fff;
      font-size: 32px;
      font-family: Helvetica, sans-serif;
    }

    .buttons {
      display: flex;
      justify-content: space-around;
      align-items: center;

      button {
        width: auto;
        height: 42px;
        display: flex;
        align-items: center;
        margin: 0;
        border: 0;
        background: #f94d6a;
        padding: 0 20px;

        border-radius: 4px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.03, '#f94d6a')};
        }

        strong {
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          margin-left: 10px;
        }
      }
      .edit {
        background: #4dbaf9;
        margin-right: 15px;
        &:hover {
          background: ${darken(0.05, '#4dbaf9')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  font-family: Helvetica, sans-serif;
  color: #fff;
  opacity: 0.8;
  font-size: 18px;

  img {
    width: 100%;
    height: 300px;
  }
  .description {
    margin-top: 25px;
    height: 128px;
    width: 900px;
    resize: none;
    text-align: justify;
    overflow: hidden;
  }

  footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 285px;
  }
  footer div {
    display: flex;
    align-items: center;
    margin-right: 30px;
    opacity: 0.6;
  }

  footer div small {
    margin-left: 7px;
    color: #fff;
  }
`;
