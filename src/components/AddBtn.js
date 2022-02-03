import history from "history";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AddBtn = () => {
  return (
    <Link to="/addpost">
      <Button>
        <h3>+</h3>
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
  background-color: yellowgreen;
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
