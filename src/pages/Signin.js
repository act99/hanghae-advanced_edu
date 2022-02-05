import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import AuthCompo from "../components/AuthCompo";

const Signin = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const history = useHistory();

  React.useEffect(() => {
    if (is_login) {
      history.push("/");
    }
  }, []);

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
