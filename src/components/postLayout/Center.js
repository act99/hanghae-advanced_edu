import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Grid, Image, RowGrid, Text } from "../../elements";
import Favorite from "../Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const Center = (props) => {
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
      <RowGrid>
        <Grid is_flex>
          <Image shape="circle" src={src} />
          <Text bold>{user_info.user_name}</Text>
          <Text>{insert_dt}</Text>
        </Grid>
        {is_me ? (
          <Button
            onClick={() => {
              history.push(`/editpost/${id}`);
            }}
          >
            수정하기
          </Button>
        ) : null}
      </RowGrid>
      <Link
        to={{ pathname: `/detail/${id}` }}
        style={{ textDecoration: "none" }}
      >
        <Grid>
          <Image shape="rectangle" src={image_url} />
        </Grid>
        <Grid padding="16px">
          <Text>{contents}</Text>
        </Grid>
      </Link>
      <RowGrid jc="start">
        <RowGrid padding="16px" width="150px">
          <Favorite id={id} />
          <Text bold margin="2px">
            좋아요: {favorite_cnt}개
          </Text>
        </RowGrid>
        <RowGrid padding="16px" width="150px">
          <CommentIcon color="secondary" />
          <Text bold margin="2px">
            댓글: {comment_cnt}개
          </Text>
        </RowGrid>
      </RowGrid>
    </Grid>
  );
};

export default Center;
