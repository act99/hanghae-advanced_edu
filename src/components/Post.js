import React from "react";
import { Grid } from "../elements";
import Center from "./postLayout/Center";
import Left from "./postLayout/Left";
import Right from "./postLayout/Right";

const Post = (props) => {
  return (
    <>
      {props.layout === "center" ? (
        <Grid padding="20px 0px">
          <Center {...props} />
        </Grid>
      ) : props.layout === "right" ? (
        <Grid padding="20px 0px">
          <Right {...props} />
        </Grid>
      ) : (
        <Grid padding="20px 0px">
          <Left {...props} />
        </Grid>
      )}
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
