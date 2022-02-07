import * as React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { actionCreators as postActions } from "../app/services/postReducer";
import { useDispatch, useSelector } from "react-redux";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function Favorite(props) {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  const onClick = () => {
    dispatch(postActions.favoriteFB(props.id, user_info.uid));
  };

  const onNonClick = () => {
    alert("로그인 후 이용해주세요");
  };
  React.useEffect(() => {
    // dispatch(postActions.getPostFB());
  }, []);

  return (
    <>
      {user_info ? (
        <StyledRating
          onClick={onClick}
          name="customized-10"
          defaultValue={0}
          max={1}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
      ) : (
        <StyledRating
          disabled
          onClick={onNonClick}
          name="customized-10"
          defaultValue={0}
          max={1}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
      )}
    </>
  );
}
