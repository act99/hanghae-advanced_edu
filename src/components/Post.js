import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Button, Grid, Image, RowGrid, Text } from "../elements";
import Center from "./postLayout/Center";
import Left from "./postLayout/Left";
import Right from "./postLayout/Right";

const Post = (props) => {
  // console.log(props);
  const history = useHistory();
  return (
    <>
      {props.layout === "center" ? (
        <Center {...props} />
      ) : props.layout === "right" ? (
        <Right {...props} />
      ) : (
        <Left {...props} />
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
