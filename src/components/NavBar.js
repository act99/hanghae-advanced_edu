import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../app/services/loginReducer";
import { actionCreators as imageActions } from "../app/services/imageReducer";
import { apiKey } from "../shared/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotiBadege from "./NotiBadge";
import { Grid, RowGrid } from "../elements";
const NavBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const logOut = () => {
    dispatch(userActions.logoutFB());
  };
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  const goBack = () => {
    history.replace("/");
    dispatch(imageActions.setPreview(null));
  };

  if (is_login === true && is_session === true) {
    return (
      <Wrap>
        <button
          onClick={goBack}
          style={{
            border: "solid 0px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <LogoText> Act99Gram</LogoText>
        </button>
        <StyleDiv>
          <IconButton
            aria-label="upload picture"
            component="span"
            onClick={() => {
              history.push("/profile");
            }}
          >
            <PersonIcon />
            <NavText>Sign</NavText>
          </IconButton>

          <NotiBadege onClick={() => history.push("/notification")} />

          <IconButton
            aria-label="upload picture"
            component="span"
            onClick={logOut}
          >
            <LogoutIcon />
            <NavText>SignOut</NavText>
          </IconButton>
        </StyleDiv>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <StyleDiv>
        <button
          onClick={goBack}
          style={{
            border: "solid 0px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <LogoText> Act99Gram</LogoText>
        </button>
      </StyleDiv>
      <StyleDiv>
        <IconButton
          aria-label="upload picture"
          component="span"
          onClick={() => {
            history.push("/signup");
          }}
        >
          <PersonAddIcon />
          <NavText>SignUp</NavText>
        </IconButton>
        <IconButton
          aria-label="upload picture"
          component="span"
          onClick={() => {
            history.push("/signin");
          }}
        >
          <LoginIcon />
          <NavText>SignIn</NavText>
        </IconButton>
      </StyleDiv>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 90%;
  height: 100px;
  display: flex;
  justify-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  color: #000000;
`;

const StyleDiv = styled.div`
  display: flex;
  justify-content: between;
  justify-items: center;
`;

const WrapIcon = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoText = styled.h3`
  font-family: "Parisienne", cursive;
  font-size: x-large;
`;

const NavText = styled.h4`
  font-family: "Parisienne", cursive;
  font-size: medium;
  margin-left: 5px;
`;

NavBar.defaultProps = {};

export default NavBar;
