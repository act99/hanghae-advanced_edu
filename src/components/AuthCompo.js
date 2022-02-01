import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { Input, Text, Button } from "../elements";
import { createCookie, getCookie, setCookie } from "../shared/Cookie";

const AuthCompo = (props) => {
  const params = useParams();
  console.log(params);
  console.log(getCookie("USER_ID"));
  const inputRef = React.useRef([]);
  const loginHandler = (e) => {
    setCookie("USER_ID", inputRef.current[1].value, 3);
    setCookie("USER_PWD", inputRef.current[2].value, 3);
    e.preventDefault();
    console.log(inputRef.current[1].value);
    console.log(inputRef.current[2].value);
  };
  const registerHandler = (e) => {
    e.preventDefault();
    console.log(inputRef.current[1].value);
    console.log(inputRef.current[2].value);
    console.log(inputRef.current[3].value);
    console.log(inputRef.current[4].value);
  };
  if (props.pageName === "로그인") {
    return (
      <>
        <form onSubmit={loginHandler}>
          <Text bold size="30px">
            {props.pageName}
          </Text>
          <WrappingInput>
            <Input label="아이디" ref={(el) => (inputRef.current[1] = el)} />
          </WrappingInput>

          <WrappingInput>
            <Input label="비밀번호" ref={(el) => (inputRef.current[2] = el)} />
          </WrappingInput>
          <Button type="submit" width="100%" margin="30px 0px 0px 0px">
            {props.pageName}하기
          </Button>
        </form>
      </>
    );
  }
  return (
    <>
      <form onSubmit={registerHandler}>
        <Text bold size="30px">
          {props.pageName}
        </Text>
        <WrappingInput>
          <Input label="아이디" ref={(el) => (inputRef.current[1] = el)} />
        </WrappingInput>
        <WrappingInput>
          <Input label="닉네임" ref={(el) => (inputRef.current[2] = el)} />
        </WrappingInput>
        <WrappingInput>
          <Input label="비밀번호" ref={(el) => (inputRef.current[3] = el)} />
        </WrappingInput>
        <WrappingInput>
          <Input
            label="비밀번호 확인"
            ref={(el) => (inputRef.current[4] = el)}
          />
        </WrappingInput>
        <Button type="submit" width="100%" margin="30px 0px 0px 0px">
          {props.pageName}하기
        </Button>
      </form>
    </>
  );
};

const WrappingInput = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 15px;
`;

export default AuthCompo;
