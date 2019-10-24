import styled from 'styled-components';
import { darken } from 'polished';

import { Input } from '@rocketseat/unform';

export const Container = styled.div`
  height: 100%;
  max-width: 900px;
  margin: 50px auto 0px auto;
  font-size: 18px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      font-size: 18px;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 0 20px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgb(255, 255, 255, 0.7);
        font-size: 18px;
      }
    }

    .button {
      display: flex;
      justify-content: flex-end;

      button {
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        width: 180px;
        height: 42px;
        background: #f94d6a;
        font-size: 16px;
        font-weight: bold;

        color: #fff;
        border: 0;
        border-radius: 4px;

        transition: background 0.2s;
        margin-top: 20px;
        margin-bottom: 120px;

        &:hover {
          background: ${darken(0.03, '#f94d6a')};
        }

        strong {
          margin-left: -10px;
        }
      }
    }

    .select-date {
      background: rgba(0, 0, 0, 0);
      width: 100%;
      margin: 0 0 10px;
      color: #fff;
      font-size: 18px;
      height: 50px;
    }
  }
`;

export const MultilineInput = styled(Input)`
  background: rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 4px;
  max-width: 100%;
  height: 200px;
  padding: 0 20px;
  color: #fff;
  font-size: 18px;

  margin: 0 0 10px;
  padding-top: 20px;
  resize: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;
