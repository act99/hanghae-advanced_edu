import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Image, RowGrid, Text } from "../elements";

const Card = (props) => {
  return (
    <Link to={`detail/${props.props.post_id}`}>
      <RowGrid
        // padding="16px"
        is_flex
        bg="white"
        key={props.props.post_id}
        margin="0px 0px"
      >
        <RowGrid padding="15px">
          <Grid width="auto" margin="0px 8px 0px 0px">
            <Image shape="square" size={85} src={props.props.image_url} />
          </Grid>
          <Grid padding="23px">
            <Text>{props.props.insert_dt}</Text>
            <Text>
              <b>{props.props.user_name}</b> 님이 게시글에 댓글을 남겼습니다.
            </Text>
          </Grid>
        </RowGrid>
      </RowGrid>
    </Link>
  );
};

Card.defaultProps = {
  image_url: "",
  user_name: "",
  id: null,
};

const BorderStyle = styled.div`
  border: solid 1px #585858;
`;

export default Card;
