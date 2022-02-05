import React from "react";
import { Grid, Image, RowGrid, Text } from "../elements";

const Card = (props) => {
  const { id, user_name, image_url } = props;
  return (
    <RowGrid
      // padding="16px"
      is_flex
      bg="white"
      key={id}
      margin="20px 0px"
    >
      <RowGrid padding="15px">
        <Grid width="auto" margin="0px 8px 0px 0px">
          <Image shape="square" size={85} />
        </Grid>
        <Grid>
          <Text margin="35px 10px">
            <b>{user_name}</b> 님이 게시글에 댓글을 남겼습니다.
          </Text>
        </Grid>
      </RowGrid>
    </RowGrid>
  );
};

Card.defaultProps = {
  image_url: "",
  user_name: "",
  id: null,
};

export default Card;
