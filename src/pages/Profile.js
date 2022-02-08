import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Profile = (props) => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <>
      <Wrap>
        <WrapEmpty>
          <h1>{user.user_name}님 어서오세요</h1>
          <h3>이메일 : {user.id}</h3>
        </WrapEmpty>
      </Wrap>
    </>
  );
};

const WrapEmpty = styled.div`
  height: 100vh;
  width: 100%;
  h1 {
    font-size: xx-large;
  }
  h3 {
    font-size: x-large;
  }
`;

const Wrap = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
export default Profile;
