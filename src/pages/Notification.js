import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Notification = (props) => {
  const noti = [
    {
      user_name: "aaaaaa",
      id: "post1",
      image_url: "",
    },
    {
      user_name: "aaaaaa",
      id: "post2",
      image_url: "",
    },
    {
      user_name: "aaaaaa",
      id: "post3",
      image_url: "",
    },
    {
      user_name: "aaaaaa",
      id: "post4",
      image_url: "",
    },
  ];
  return (
    <>
      <Wrap>
        {noti.map((item, index) => {
          return <Card props={item} key={item.id} />;
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
