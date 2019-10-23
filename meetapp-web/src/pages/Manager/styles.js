import styled from 'styled-components';
import { darken } from 'polished';

import { Input } from '@rocketseat/unform';

export const Container = styled.div`
  height: 100%;
  max-width: 900px;
  margin: 50px auto 0px auto;
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
        font-weight: bold;
        font-size: 16px;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;
        margin-bottom: 120px;

        &:hover {
          background: ${darken(0.03, '#f94d6a')};
        }

        strong {
          margin-left: -10px;
        }
      }
    }
  }
`;

export const MultilineInput = styled(Input)`
  background: rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 4px;
  max-width: 100%;
  height: 200px;
  padding: 0 15px;
  color: #fff;
  margin: 0 0 10px;
  resize: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;
