import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    width,
    height,
    backgroundColor,
    color,
    onClick,
    children,
    margin,
    padding,
    border,
    type,
    disabled,
  } = props;
  const styles = {
    width,
    height,
    backgroundColor,
    color,
    margin,
    padding,
    border,
    type,
  };
  return (
    <Btn {...styles} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </Btn>
  );
};

const Btn = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  margin-right: 50;
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};

  cursor: pointer;
`;

Button.defaultProps = {
  type: "button",
  margin: "5px",
  padding: "10px",
  width: "100px",
  height: "40px",
  title: "버튼",
  backgroundColor: "black",
  color: "white",
  onClick: () => {},
  border: "0px",
};

export default Button;
