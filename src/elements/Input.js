import styled from "styled-components";
import React, { forwardRef } from "react";
const Input = forwardRef((props, ref) => {
  const {
    padding,
    placeholder,
    width,
    height,
    label,
    placeholderColor,
    type,
    onChange,
    value,
    onKeyPress,
    onSubmit,
  } = props;
  const styles = { padding, width, height, placeholder, placeholderColor };

  return (
    <>
      {props.label ? <Label>{label}</Label> : null}
      <InputTile
        {...styles}
        ref={ref}
        type={type}
        onChange={onChange}
        value={value}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit(e);
          }
        }}
      />
    </>
  );
});

Input.defaultProps = {
  width: "100%",
  height: "30px",
  padding: "5px",
  placeholder: "텍스트를 입력하세요",
  placeholderColor: "gray",
  label: "",
  type: "text",
  onChange: () => {},
  onKeyPress: () => {},
  onSubmit: () => {},
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
