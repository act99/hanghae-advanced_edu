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
import { Link } from "react-router-dom";

const Notification = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = React.useState([]);
  console.log(user);
  React.useEffect(() => {
    if (!user) {
      history.push("/");
    } else {
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
    }
  }, [user]);
  console.log(noti);

  return noti.length === 0 ? (
    <>
      <Wrap>
        <WrapEmpty>
          <h3>알림이</h3>
          <h3>텅</h3>
          <h3>비었습니다</h3>
          <h3>.</h3>
          <h3>.</h3>
          <h3>.</h3>
          <h3>알림이 오면</h3>
          <h3>다시 찾아주시죠</h3>
          <h3>그럼 이만...</h3>
          <Link to="/">
            <h3>홈으로</h3>
          </Link>
        </WrapEmpty>
      </Wrap>
    </>
  ) : (
    <>
      <Wrap>
        {noti.map((item, index) => {
          return <Card props={item} key={index} />;
        })}
      </Wrap>
    </>
  );
};

const WrapEmpty = styled.div`
  height: 100vh;
  width: 100%;
  h3 {
    font-size: xx-large;
  }
`;

const Wrap = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export default Notification;
