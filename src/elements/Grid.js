import React from "react";
import styled from "styled-components";
const Grid = (props) => {
  const { is_flex, width, margin, padding, bg, children, center } = props;
  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
  };
  return (
    <>
      <GridBox {...styles}>{children}</GridBox>
    </>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  padding: ${(props) => (props.padding ? `${props.padding}` : "")};
  margin: ${(props) => (props.margin ? `${props.margin}` : "")};
  background-color: ${(props) => (props.bg ? ` ${props.bg}` : "white")};
  display: ${(props) =>
    props.is_flex
      ? "display : flex; align-items: center; justify-content : space-between"
      : ""};

  text-align: ${(props) => (props.center ? "center" : "")};
`;

export default Grid;
