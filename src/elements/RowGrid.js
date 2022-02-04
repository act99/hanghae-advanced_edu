import React from "react";
import styled from "styled-components";

const RowGrid = (props) => {
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
RowGrid.defaultProps = {
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
  margin: 10px;
  /* padding: ${(props) => (props.padding ? `${props.padding}` : "")};
  margin: ${(props) => (props.margin ? `${props.margin}` : "")};
  background-color: ${(props) =>
    props.bg ? `background-color: ${props.bg}` : ""}; */
  display: flex;
  flex-direction: row;

  /* display: ${(props) =>
    props.is_flex
      ? "display : flex;  align-items: center; justify-content : space-between; flex-direction: row;"
      : ""}; */
`;

export default RowGrid;
