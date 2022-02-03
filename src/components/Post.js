import React from "react";
import { Link } from "react-router-dom";

import { Grid, Image, Text } from "../elements";

const Post = (props) => {
  return (
    <>
      <Grid>
        <Grid is_flex>
          <Image shape="circle" src={props.src} />
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Link to="/detail">
            <Image shape="rectangle" src={props.src} />
          </Link>
        </Grid>
        <Grid padding="16px">
          <Text bold>{props.comment_cnt}개</Text>
        </Grid>
      </Grid>
    </>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "Jooseok",
    user_profile:
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  image_url:
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  contents: "고양이네요",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
};

export default Post;
