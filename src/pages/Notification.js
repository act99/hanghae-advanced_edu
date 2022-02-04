import React from "react";
import { Grid, Image, RowGrid, Text } from "../elements";

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
      <Grid padding="16px" bg="gray">
        {noti.map((item, index) => {
          return (
            <RowGrid
              padding="16px"
              is_flex
              bg="#ffffff"
              key={item.id}
              margin="20px"
            >
              <Grid width="auto" margin="0px 8px 0px 0px">
                <Image />
              </Grid>
              <Grid>
                <Text margin="10px 0px">
                  <b>{item.user_name}</b> 님이 게시글에 댓글을 남겼습니다.
                </Text>
              </Grid>
            </RowGrid>
          );
        })}
      </Grid>
    </>
  );
};

export default Notification;
