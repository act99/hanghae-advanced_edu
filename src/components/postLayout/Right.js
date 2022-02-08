import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Grid, Image, RowGrid, Text } from "../../elements";
import Favorite from "../Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import styled from "styled-components";
import CreateIcon from "@mui/icons-material/Create";

const Right = (props) => {
  const history = useHistory();
  const {
    src,
    user_info,
    id,
    contents,
    image_url,
    comment_cnt,
    insert_dt,
    is_me,
    favorite_cnt,
  } = props;
  return (
    <Grid>
      <BorderStyle>
        <RowGrid margin="5px 10px" width="90%">
          <Grid is_flex>
            <Image shape="circle" src={src} />
            <Text bold>{user_info.user_name}</Text>
            <Text>{insert_dt}</Text>
          </Grid>
          {is_me ? (
            <Button
              backgroundColor="white"
              color="black"
              onClick={() => {
                history.push(`/editpost/${id}`);
              }}
            >
              <RowGrid width="100px" margin="0px 10px 0px 0px">
                <h3>수정하기</h3>
                <CreateIcon />
              </RowGrid>
            </Button>
          ) : null}
        </RowGrid>
        <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
          <RowGrid>
            <Grid padding="16px">
              <Text>{contents}</Text>
            </Grid>
            <Grid>
              <Image shape="rectangle" src={image_url} />
            </Grid>
          </RowGrid>
        </Link>
        <RowGrid jc="start">
          <RowGrid padding="16px" width="150px" height="25px">
            <Favorite props={{ ...props }} />
            <Text bold margin="2px">
              좋아요: {favorite_cnt}개
            </Text>
          </RowGrid>
          <RowGrid padding="16px" width="150px">
            <CommentIcon color="secondary" />
            <Text bold margin="2px 8px">
              댓글: {comment_cnt}개
            </Text>
          </RowGrid>
        </RowGrid>
      </BorderStyle>
    </Grid>
  );
};

const BorderStyle = styled.div`
  border: solid 1px #585858;
`;

export default Right;
