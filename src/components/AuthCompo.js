import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { Input, Text, Button } from "../elements";
import { getCookie } from "../shared/Cookie";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../app/services/loginReducer";

const AuthCompo = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  console.log(getCookie("USER_ID"));
  const inputRef = React.useRef([]);
  console.log(inputRef.current);

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(inputRef.current[1].value, inputRef.current[2].value);
    if (inputRef.current[1].value === "" || inputRef.current[2].value === "") {
      alert("아이디 또는 비밀번호가 공란입니다.");
    } else {
      dispatch(
        userActions.loginFB(
          inputRef.current[1].value,
          inputRef.current[2].value
        )
      );
    }
  };
  const registerHandler = (e) => {
    e.preventDefault();
    const signup = () => {
      dispatch(
        userActions.signupFB(
          inputRef.current[1].value,
          inputRef.current[3].value,
          inputRef.current[2].value
        )
      );
    };
    if (inputRef.current[3].value === inputRef.current[4].value) {
      signup();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  if (props.pageName === "로그인") {
    return (
      <>
        <form onSubmit={loginHandler}>
          <Text bold size="30px">
            {props.pageName}
          </Text>
          <WrappingInput>
            <Input
              label="이메일"
              ref={(el) => (inputRef.current[1] = el)}
              type="email"
            />
          </WrappingInput>

          <WrappingInput>
            <Input
              label="비밀번호"
              ref={(el) => (inputRef.current[2] = el)}
              type="password"
            />
          </WrappingInput>
          <Button
            type="submit"
            width="100%"
            margin="30px 0px 0px 0px"
            // onClick={loginHandler}
          >
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
          <Input
            label="아이디"
            ref={(el) => (inputRef.current[1] = el)}
            type="email"
          />
        </WrappingInput>
        <WrappingInput>
          <Input label="닉네임" ref={(el) => (inputRef.current[2] = el)} />
        </WrappingInput>
        <WrappingInput>
          <Input
            label="비밀번호"
            ref={(el) => (inputRef.current[3] = el)}
            type="password"
          />
        </WrappingInput>
        <WrappingInput>
          <Input
            label="비밀번호 확인"
            ref={(el) => (inputRef.current[4] = el)}
            type="password"
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
