import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AuthCompo from "../components/AuthCompo";

const AuthPage = (props) => {
  return (
    <Wrap>
      <AuthCompo pageName={props.pageName} />
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
export default AuthPage;
