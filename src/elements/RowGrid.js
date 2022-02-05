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
  margin: ${(props) => (props.margin ? props.margin : "")};
  width: ${(props) => props.width};
  height: 100%;
  padding: ${(props) => props.padding};
  /* margin: 50px; */
  background-color: ${(props) => props.bg};

  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
`;

export default RowGrid;
