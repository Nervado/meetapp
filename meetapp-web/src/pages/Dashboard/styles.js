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

    button {
      width: 172px;
      height: 42px;

      display: flex;
      align-items: center;
      justify-content: space-around;

      background: #f94d6a;

      border: 0;

      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
      strong {
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        margin-left: -20px;
      }
    }
  }

  ul {
    max-width: 100%;
  }
`;

export const Meetup = styled.li`
  height: 62px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
  background: rgb(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin-left: 30px;
  }

  div {
    display: flex;
    align-items: center;
    text-align: right;
    margin-right: 20px;

    strong {
      opacity: 0.6;
      margin-right: 30px;
    }
  }
`;
