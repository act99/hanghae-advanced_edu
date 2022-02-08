import React from "react";
import styled from "styled-components";

const RowGrid = (props) => {
  const { is_flex, width, margin, padding, bg, children, height, center, jc } =
    props;
  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    jc: jc,
    height: height,
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
  bg: "255, 255, 255, 0.0",
  center: false,
  jc: "center",
  height: "100%",
};

const GridBox = styled.div`
  margin: ${(props) => (props.margin ? props.margin : "")};
  width: ${(props) => props.width};
  height: ${(props) => (props.height ? props.height : "100%")};
  padding: ${(props) => props.padding};
  /* margin: 50px; */
  background-color: ${((props) => (props.bg ? props.bg : 255), 255, 255, 0.0)};

  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.jc};
  justify-items: center;
`;

export default RowGrid;
