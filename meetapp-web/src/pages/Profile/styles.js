import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  max-width: 900px;
  margin: 50px auto 0px auto;
  font-family: Helvetica, sans-serif;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
      &:nth-child(3) {
        height: 200px;
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }
    .button-area {
      display: flex;
      justify-content: flex-end;

      button {
        display: flex;
        align-items: center;

        width: 162px;
        height: 42px;

        margin: 0;
        border: 0;
        background: #f94d6a;
        border-radius: 4px;
        padding: 0 20px;

        color: #fff;
        font-weight: bold;
        font-size: 16px;

        transition: background 0.2s;

        margin-top: 20px;
        margin-bottom: 120px;

        &:hover {
          background: ${darken(0.03, '#f94d6a')};
        }

        strong {
        }
      }
    }
  }
`;
