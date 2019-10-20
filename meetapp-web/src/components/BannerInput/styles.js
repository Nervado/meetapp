import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.4);
  align-self: center;
  margin-bottom: 30px;

  height: 300px;
  width: 900px;

  font-family: Helvetica, sans-serif;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 300px;
      width: 900px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.4);
    }

    input {
      display: none;
    }

    div {
      position: relative;
      margin-top: 106px;

      display: flex;
      flex-direction: column;
      align-items: center;

      font-size: 20px;

      strong {
        color: #fff;
        opacity: 0.3;
      }
    }
  }
`;
