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

const NotiBadege = (props) => {
  const [isRead, setIsRead] = React.useState(true);
  const user_id = useSelector((state) => state.user.user.uid);
  const db = getDatabase();

  const notiCheck = () => {
    const Data = {
      read: true,
    };
    console.log(user_id);
    const updates = {};
    updates["/noti/" + user_id] = Data;
    update(ref(db), updates);
    props.onClick();
  };
  console.log(user_id);
  React.useEffect(() => {
    const db = getDatabase();
    const notiDB = ref(db, "noti/" + user_id);

    onValue(notiDB, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setIsRead(snapshot.val().read);
    });
  }, []);
  return (
    <>
      <Badge color="secondary" variant="dot" invisible={isRead}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={notiCheck}
        >
          <NotificationsIcon />
        </IconButton>
      </Badge>
    </>
  );
};

NotiBadege.defaultProps = {
  onClick: () => {},
};

export default NotiBadege;
