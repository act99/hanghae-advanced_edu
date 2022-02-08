import React from "react";
import DetailCompo from "../components/DetailCompo";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Grid } from "../elements";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { actionCreators as postActions } from "../app/services/postReducer";
import Permit from "../shared/Permit";
import { apiKey } from "../shared/firebase";
const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((item) => item.id === id);
  const post_data = post_list[post_idx];
  const user_info = useSelector((state) => state.user.user);
  const [post, setPost] = React.useState(post_data ? post_data : null);
  const comment_info = useSelector((state) => state.comment.list[id]);

  const is_login = useSelector((state) => state.user.user);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  console.log(comment_info);
  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
    setPost(post_data);
  }, [post_data]);

  if (is_session && is_login) {
    return (
      <>
        {post && (
          <DetailCompo
            {...post}
            is_me={post.user_info.user_id === user_info.uid}
          />
        )}
        <Grid is_flex>
          <Permit>
            <CommentWrite post_id={id} />
          </Permit>
          <CommentList post_id={id} />
        </Grid>
      </>
    );
  }
  return (
    <>
      {post && <DetailCompo {...post} />}
      <Grid is_flex>
        <CommentList post_id={id} />
      </Grid>
    </>
  );
};

export default Detail;
