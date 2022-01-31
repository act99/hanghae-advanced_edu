import styled from "styled-components";
import React from "react";
const Input = (props) => {
  const { padding, placeholder, width, height, label, placeholderColor } =
    props;
  const styles = { padding, width, height, placeholder, placeholderColor };

  return (
    <>
      {props.label ? <Label>{label}</Label> : null}
      <InputTile {...styles} />
    </>
  );
};

Input.defaultProps = {
  width: "100%",
  height: "30px",
  padding: "5px",
  placeholder: "텍스트를 입력하세요",
  placeholderColor: "gray",
  label: "",
};

const InputTile = styled.input`
  border: sold 0px;
  border-radius: 5px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  :focus {
    outline: 2px solid blueviolet;
    border: sold 2px green;
  }
  ::placeholder {
    ${(props) => props.placeholder};
    color: ${(props) => props.placeholderColor};
  }
`;

const Label = styled.label`
  font-size: small;
  font-weight: bold;
`;

export default Input;
