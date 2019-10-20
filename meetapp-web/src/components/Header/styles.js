import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 92px;
  background: rgb(0, 0, 0, 0.3);
  padding: 0 30px;
  font-family: Helvetica, sans-serif;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    img {
      height: 32px;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  align-items: center;

  div {
    text-align: right;
    margin-right: 10px;
    font-size: 14px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  button {
    margin-left: 20px;
    height: 41px;
    width: 72px;
    background: #d44059;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#d44059')};
    }
  }
`;
