import { Badge, IconButton } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  goOffline,
  update,
} from "firebase/database";
import styled from "styled-components";

const NotiBadege = (props) => {
  const [isRead, setIsRead] = React.useState(true);
  const user_id = useSelector((state) => state.user.user.uid);
  const db = getDatabase();

  const notiCheck = () => {
    update(ref(db, `noti/${user_id}`), {
      read: true,
    });
    props.onClick();
  };
  console.log(user_id);
  React.useEffect(() => {
    const db = getDatabase();
    const notiDB = ref(db, "noti/" + user_id);

    onValue(notiDB, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setIsRead(snapshot.val().read);
      }
    });
  }, [isRead]);
  return (
    <>
      <IconButton
        aria-label="upload picture"
        component="span"
        onClick={notiCheck}
      >
        <Badge color="secondary" variant="dot" invisible={isRead}>
          <WrapIcon>
            <NotificationsIcon />
          </WrapIcon>
          <NavText>Alarm</NavText>
        </Badge>
      </IconButton>
    </>
  );
};

NotiBadege.defaultProps = {
  onClick: () => {},
};
const WrapIcon = styled.div`
  margin-top: 20px;
`;

const NavText = styled.h4`
  font-family: "Parisienne", cursive;
  font-size: medium;
`;

export default NotiBadege;
