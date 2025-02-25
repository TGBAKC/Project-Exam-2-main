import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  background-color: #fff;
`;

const Title = styled.h1`
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #ea6659;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export {
  Button,
  Checkbox,
  Container,
  ErrorMessage,
  Form,
  FormWrapper,
  Input,
  Label,
  Title,
};
