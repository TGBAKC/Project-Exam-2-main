import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 30px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 5px;
  color: #333;
  font-size: 22px;
`;

const Subtitle = styled.p`
  margin-bottom: 20px;
  color: #777;
  font-size: 14px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease-in-out;

  &:focus {
    border: 1px solid #ea6659;
  }
`;

const Button = styled.button`
  background-color: #ea6659;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #d45548;
  }
`;

const RegisterText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #666;
`;

const RegisterLink = styled.span`
  color: #ea6659;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
`;

export {
  Button,
  Container,
  Form,
  Input,
  RegisterLink,
  RegisterText,
  Subtitle,
  Title,
};
