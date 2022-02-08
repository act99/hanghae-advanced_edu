import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Grid, Image, Text, Button, RowGrid } from "../elements";
import Delete from "./Delete";

const DetailCompo = (props) => {
  const history = useHistory();
  const { is_me } = props;
  console.log(props);

  return (
    <Grid>
      <Grid is_flex>
        <RowGrid is_flex jc="space-evenly">
          <Grid>
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
            <Text>{props.insert_dt}</Text>
          </Grid>

          {is_me ? (
            <>
              <Button
                onClick={() => {
                  history.push(`/editpost/${props.id}`);
                }}
              >
                수정하기
              </Button>
              <Delete id={props.id} />
            </>
          ) : null}
        </RowGrid>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={props.image_url} />
      </Grid>
      <Grid padding="16px">
        <Text>{props.contents}</Text>
      </Grid>

      <Grid padding="16px">
        <Text bold>댓글 {props.comment_cnt}개</Text>
      </Grid>
    </Grid>
  );
};

DetailCompo.defaultProps = {
  user_info: {
    user_name: "Jooseok",
    user_profile:
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  image_url:
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  contents: "고양이네요",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
};

export default DetailCompo;
