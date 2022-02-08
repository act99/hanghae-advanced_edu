import history from "history";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CreateIcon from "@mui/icons-material/Create";
const AddBtn = () => {
  return (
    <Link to="/addpost">
      <Button>
        <CreateIcon />
      </Button>
    </Link>
  );
};

const Button = styled.button`
  border: 0px;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: gray;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  h3 {
    margin: 0;
    font-size: 50px;
    font-weight: bold;
    position: fixed;
    bottom: 46px;
    right: 60px;
    color: white;
  }
`;

export default AddBtn;
