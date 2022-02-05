import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Grid, Image, RowGrid, Text } from "../../elements";

const Right = (props) => {
  const history = useHistory();
  const { src, user_info, id, contents, image_url, comment_cnt, insert_dt } =
    props;
  console.log(props);
  return (
    <Grid>
      <RowGrid>
        <Grid is_flex>
          <Image shape="circle" src={src} />
          <Text bold>{user_info.user_name}</Text>
          <Text>{insert_dt}</Text>
        </Grid>
        <Button
          onClick={() => {
            history.replace(`/editpost/${id}`);
          }}
        >
          수정하기
        </Button>
      </RowGrid>
      <RowGrid>
        <Grid padding="16px">
          <Text>{contents}</Text>
        </Grid>
        <Grid>
          <Link to="/detail">
            <Image shape="rectangle" src={image_url} />
          </Link>
        </Grid>
      </RowGrid>
      <Grid padding="16px">
        <Text bold>{comment_cnt}개</Text>
      </Grid>
    </Grid>
  );
};

export default Right;
