import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../app/services/commentReducer";
import { Grid, Input, Button } from "../elements";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const commentRef = useRef(null);
  const [comment, setComment] = React.useState("");
  const { post_id } = props;
  const onClick = () => {
    console.log(commentRef.current.value);
    dispatch(commentActions.addCommentFB(post_id, comment));
    setComment("");
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };
  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          width="80%"
          ref={commentRef}
          onChange={onChangeHandler}
          value={comment}
          onSubmit={onClick}
        />
        <Button width="15%" margin="0px 2px 0px 2px" onClick={onClick}>
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
