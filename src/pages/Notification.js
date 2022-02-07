import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  query,
} from "firebase/database";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Notification = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = React.useState([]);
  console.log(user);
  const array = [];
  React.useEffect(() => {
    if (!user) {
      history.push("/");
    }
    const db = getDatabase();
    const notiRef = ref(db, `noti/${user.uid}/list`);
    const upperRef = query(notiRef, orderByChild("insert_dt"));

    onValue(upperRef, (snapshot) => {
      const data = snapshot.val();
      let _noti_list = Object.keys(data)
        .reverse()
        .map((item) => {
          return data[item];
        });
      setNoti(_noti_list);
    });
  }, [user]);
  console.log(noti);

  return (
    <>
      <Wrap>
        {noti.map((item, index) => {
          return <Card props={item} key={index} />;
        })}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  height: 100%;
  padding: 20px;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
`;

export default Notification;
