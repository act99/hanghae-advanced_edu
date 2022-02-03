import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Grid, Image, Input, Text } from "../elements";
import TextArea from "../elements/TextArea";
import Upload from "./Upload";
import { actionCreators as postActions } from "../app/services/postReducer";

const AddCompo = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const history = useHistory();
  const dispatch = useDispatch();
  const [contents, setContents] = React.useState("");
  const preview = useSelector((state) => state.image.preview);
  const changeContents = (e) => {
    setContents(e.target.value);
    console.log(contents);
  };
  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px">앗! 잠깐!</Text>
        <Text size="16px" margin="20px 0px">
          로그인 후에만 글을 쓸 수 있어요!
        </Text>
        <Button width="100%" onClick={() => history.replace("/")}>
          로그인 하러가기
        </Button>
      </Grid>
    );
  }
  return (
    <>
      <Grid>
        <Grid padding="16px">
          <Text bold size="30px">
            게시글 작성
          </Text>
        </Grid>
        <Upload />
        <Grid padding="16px">
          <Text bold size="16px">
            미리보기
          </Text>
        </Grid>
        <Grid>
          <Image
            shape="rectangle"
            src={preview ? preview : "https://via.placeholder.com/400x300"}
          />
        </Grid>
        <Grid padding="16px">
          <Text>게시글 내용</Text>
          <TextArea onChange={changeContents} />
        </Grid>

        <Grid is_flex>
          <Button
            width="100%"
            margin="10px"
            padding="10px"
            height="50px"
            onClick={addPost}
          >
            게시글 작성
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

AddCompo.defaultProps = {
  contents: "고양이네요",
};

export default AddCompo;
