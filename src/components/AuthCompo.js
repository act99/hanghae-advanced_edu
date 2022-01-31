import React from "react";
import styled from "styled-components";
import { Input, Text, Button } from "../elements";

const AuthCompo = (props) => {
  if (props.pageName === "로그인") {
    return (
      <>
        <form>
          <Text bold size="30px">
            {props.pageName}
          </Text>
          <WrappingInput>
            <Input label="아이디" />
          </WrappingInput>

          <WrappingInput>
            <Input label="비밀번호" />
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
      <form>
        <Text bold size="30px">
          {props.pageName}
        </Text>
        <WrappingInput>
          <Input label="아이디" />
        </WrappingInput>
        <WrappingInput>
          <Input label="닉네임" />
        </WrappingInput>
        <WrappingInput>
          <Input label="비밀번호" />
        </WrappingInput>
        <WrappingInput>
          <Input label="비밀번호 확인" />
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
