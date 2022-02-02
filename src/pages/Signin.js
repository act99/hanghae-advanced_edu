import React from "react";
import styled from "styled-components";
import AuthCompo from "../components/AuthCompo";

const Signin = () => {
  return (
    <Wrap>
      <AuthCompo pageName="로그인" />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-top: 50px;
  padding: 30px;
`;
export default Signin;
