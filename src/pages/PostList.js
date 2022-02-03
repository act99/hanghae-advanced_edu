import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../app/services/postReducer";
import Post from "../components/Post";
import { actionCreators as postActions } from "../app/services/postReducer";
const PostList = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);
  return (
    <>
      {post_list.map((item, index) => {
        return <Post key={item.id} {...item} />;
      })}
      <Post />
    </>
  );
};

export default PostList;
