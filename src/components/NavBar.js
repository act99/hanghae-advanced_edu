import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../app/services/loginReducer";
import { actionCreators as imageActions } from "../app/services/imageReducer";
import { apiKey } from "../shared/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LogoutIcon from "@mui/icons-material/Logout";
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotiBadege from "./NotiBadge";
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
        <div>
          <Button backgroundColor="gray" color="black" onClick={goBack}>
            Instagram?
          </Button>
        </div>
        <div>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => {
              history.push("/profile");
            }}
          >
            <PersonIcon />
          </IconButton>
          {/* <Badge color="secondary" badgeContent={99}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => history.push("/notification")}
            >
              <NotificationsIcon />
            </IconButton>
          </Badge> */}
          <NotiBadege onClick={() => history.push("/notification")} />

          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={logOut}
          >
            <LogoutIcon />
          </IconButton>
        </div>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <div>
        <Button
          backgroundColor="gray"
          color="black"
          onClick={() => history.replace("/")}
        >
          Instagram?
        </Button>
      </div>
      <div>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => {
            history.push("/signup");
          }}
        >
          <PersonAddIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => {
            history.push("/signin");
          }}
        >
          <LoginIcon />
        </IconButton>
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
