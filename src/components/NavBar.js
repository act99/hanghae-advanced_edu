import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";
import { deleteCookie, getCookie } from "../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../app/services/loginReducer";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  console.log(is_login);

  const logOut = () => {
    dispatch(userActions.logOut({}));
  };

  if (is_login === true) {
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
              알림
            </Button>
          </Link>
          <Button backgroundColor="gray" color="black" onClick={logOut}>
            로그아웃
          </Button>
        </div>
      </Wrap>
    );
  }

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
