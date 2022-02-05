import React from "react";
import DetailCompo from "../components/DetailCompo";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Grid } from "../elements";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { firestore } from "../shared/firebase";

const Detail = () => {
  const params = useParams();
  const id = params.id;
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((item) => item.id === id);
  const post_data = post_list[post_idx];
  const user_info = useSelector((state) => state.user.user);
  const [post, setPost] = React.useState(post_data ? post_data : null);
  React.useEffect(() => {
    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        setPost(post);
      });
  }, []);

  return (
    <>
      {post && (
        <DetailCompo
          {...post}
          is_me={post.user_info.user_id === user_info.uid}
        />
      )}

      <Grid is_flex>
        <CommentWrite />
        <CommentList />
      </Grid>
    </>
  );
};

export default Detail;
