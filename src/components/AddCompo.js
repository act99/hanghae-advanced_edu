import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Grid, Image, Input, RowGrid, Text } from "../elements";
import TextArea from "../elements/TextArea";
import Upload from "./Upload";
import { actionCreators as postActions } from "../app/services/postReducer";
import { actionCreators as imageActions } from "../app/services/imageReducer";
import styled from "styled-components";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../shared/firebase";

const AddCompo = (props) => {
  const params = useParams();
  const is_login = useSelector((state) => state.user.is_login);
  const [layout, setLayout] = React.useState("center");
  const history = useHistory();
  const dispatch = useDispatch();
  const [contents, setContents] = React.useState("");
  const preview = useSelector((state) => state.image.preview);
  const postList = useSelector((state) => state.post.list);
  const changeContents = (e) => {
    setContents(e.target.value);
  };
  const [dataLoading, setDataLoading] = React.useState(false);

  const handleLayout = (e) => {
    setLayout(e.target.value);
  };
  const addPost = () => {
    dispatch(postActions.addPostFB(contents, layout));
  };
  const editPost = () => {
    dispatch(
      postActions.updatePostFB(params.id, {
        contents: contents,
        layout: layout,
      })
    );
  };
  const dataRef = React.useRef(null);
  React.useEffect(() => {
    if (params.id) {
      const docRef = doc(db, "post", params.id);
      const gettingDoc = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dataRef.current = { ...docSnap.data() };
          // dispatch(postActions.setPost(postList));
          setDataLoading(true);
          setContents(dataRef.current.contents);
          dispatch(imageActions.setPreview(dataRef.current.image_url));
        } else {
          console.log("data none");
        }
      };
      gettingDoc();
    }
    // if (params.id !== undefined) {
    //   dispatch(postActions.uploadPostFB(params.id, contents, layout));
    // }
  }, []);
  console.log(dataRef.current);
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

  if (params.id !== undefined && dataLoading === true) {
    return (
      <>
        <Grid>
          <Grid padding="16px">
            <Text bold size="30px">
              게시글 수정
            </Text>
          </Grid>
          <WrapSelect>
            <Text bold size="16px" margin="15px">
              레이아웃을 선택해주세요 :)
            </Text>
            <Select onChange={handleLayout}>
              <option value="center">중앙</option>
              <option value="left">왼쪽</option>
              <option value="right">오른쪽</option>
            </Select>
          </WrapSelect>
          <Upload />
          {layout === "center" ? (
            <>
              <Grid padding="16px" is_flex>
                <Text bold size="16px">
                  미리보기
                </Text>
                <Image
                  shape="rectangle"
                  src={
                    preview ? preview : "https://via.placeholder.com/400x300"
                    // preview ? preview : "https://via.placeholder.com/400x300"
                  }
                />
              </Grid>
              <Grid padding="16px">
                <Text>게시글 내용</Text>
                <TextArea onChange={changeContents} editValue={contents} />
              </Grid>
            </>
          ) : layout === "right" ? (
            <>
              <RowGrid is_flex>
                <Grid margin="15px 40px">
                  <Text bold size="16px">
                    게시글 내용
                  </Text>
                  <TextArea
                    onChange={changeContents}
                    width="300px"
                    height="220px"
                    margin="0px"
                    editValue={contents}
                  />
                </Grid>
                <Grid margin="15px">
                  <Text bold size="16px">
                    미리보기
                  </Text>
                  <Image
                    row
                    shape="rectangle"
                    src={
                      preview ? preview : "https://via.placeholder.com/400x300"
                    }
                  />
                </Grid>
              </RowGrid>
            </>
          ) : (
            <>
              <RowGrid is_flex>
                <Grid margin="15px 40px">
                  <Text bold size="16px">
                    미리보기
                  </Text>
                  <Image
                    row
                    shape="rectangle"
                    src={
                      preview ? preview : "https://via.placeholder.com/400x300"
                    }
                  />
                </Grid>
                <Grid margin="15px">
                  <Text bold size="16px">
                    게시글 내용
                  </Text>
                  <TextArea
                    onChange={changeContents}
                    width="300px"
                    height="220px"
                    margin="0px"
                    editValue={contents}
                  />
                </Grid>
              </RowGrid>
            </>
          )}

          <Grid is_flex>
            {contents === "" || preview === null ? (
              <Button
                width="100%"
                margin="10px"
                padding="10px"
                height="50px"
                onClick={addPost}
                disabled={true}
                backgroundColor="gray"
              >
                게시물을 입력해주세요.
              </Button>
            ) : (
              <Button
                width="100%"
                margin="10px"
                padding="10px"
                height="50px"
                onClick={editPost}
                disabled={false}
              >
                게시글 수정
              </Button>
            )}
          </Grid>
        </Grid>
      </>
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
        <WrapSelect>
          <Text bold size="16px" margin="15px">
            레이아웃을 선택해주세요 :)
          </Text>
          <Select onChange={handleLayout}>
            <option value="center">중앙</option>
            <option value="left">왼쪽</option>
            <option value="right">오른쪽</option>
          </Select>
        </WrapSelect>
        <Upload />
        {layout === "center" ? (
          <>
            <Grid padding="16px" is_flex>
              <Text bold size="16px">
                미리보기
              </Text>
              <Image
                shape="rectangle"
                src={preview ? preview : "https://via.placeholder.com/400x300"}
              />
            </Grid>
            <Grid padding="16px">
              <Text>게시글 내용</Text>
              <TextArea onChange={changeContents} />
            </Grid>
          </>
        ) : layout === "right" ? (
          <>
            <RowGrid is_flex>
              <Grid margin="15px 40px">
                <Text bold size="16px">
                  게시글 내용
                </Text>
                <TextArea
                  onChange={changeContents}
                  width="30vw"
                  height="220px"
                  margin="0px"
                />
              </Grid>
              <Grid margin="15px">
                <Text bold size="16px">
                  미리보기
                </Text>
                <Image
                  row
                  shape="rectangle"
                  src={
                    preview ? preview : "https://via.placeholder.com/400x300"
                  }
                />
              </Grid>
            </RowGrid>
          </>
        ) : (
          <>
            <RowGrid is_flex>
              <Grid margin="15px 40px">
                <Text bold size="16px">
                  미리보기
                </Text>
                <Image
                  row
                  shape="rectangle"
                  src={
                    preview ? preview : "https://via.placeholder.com/400x300"
                  }
                />
              </Grid>
              <Grid margin="15px">
                <Text bold size="16px">
                  게시글 내용
                </Text>
                <TextArea
                  onChange={changeContents}
                  width="30vw"
                  height="220px"
                  margin="0px"
                />
              </Grid>
            </RowGrid>
          </>
        )}

        <Grid is_flex>
          {contents === "" || preview === null ? (
            <Button
              width="100%"
              margin="10px"
              padding="10px"
              height="50px"
              onClick={addPost}
              disabled={true}
              backgroundColor="gray"
            >
              게시물을 입력해주세요.
            </Button>
          ) : (
            <Button
              width="100%"
              margin="10px"
              padding="10px"
              height="50px"
              onClick={addPost}
              disabled={false}
            >
              게시글 작성
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

AddCompo.defaultProps = {
  contents: "고양이네요",
};

const WrapSelect = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Select = styled.select`
  width: 200px;
  height: 50px;
`;

export default AddCompo;
