import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";

const NavBar = (props) => {
  return (
    <Wrap>
      <div>
        <Link to="/profile">
          <Button
            backgroundColor="gray"
            color="black"
            width="40px"
            height="40px"
          ></Button>
        </Link>
      </div>
      <div>
        <Link to="/signup">
          <Button backgroundColor="gray" color="black">
            회원가입
          </Button>
        </Link>
        <Link to="/signin">
          <Button backgroundColor="gray" color="black">
            로그인
          </Button>
        </Link>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-items: center;
  justify-content: space-between;
`;

NavBar.defaultProps = {};

export default NavBar;
