import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../app/services/postReducer";
import Post from "../components/Post";
import { actionCreators as postActions } from "../app/services/postReducer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import InfinityScroll from "../shared/InfinityScroll";
const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  console.log(post_list);
  console.log(paging.next);
  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);
  return (
    <>
      <InfinityScroll
        callNext={() => dispatch(postActions.getPostFB(paging.next))}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((item, index) => {
          if (user_info && item.user_info.user_id === user_info.uid) {
            return <Post key={item.id} {...item} is_me />;
          } else {
            return <Post key={item.id} {...item} />;
          }
        })}
      </InfinityScroll>
    </>
  );
};

export default PostList;
