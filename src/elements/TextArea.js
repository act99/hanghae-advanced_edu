import styled from "styled-components";

const TextArea = (props) => {
  const { display, margin, border, width, height, placeholder, onChange } =
    props;
  const styles = { display, margin, border, width, height };
  return (
    <>
      <TextAreaBox {...styles} placeholder={placeholder} onChange={onChange} />
    </>
  );
};

const TextAreaBox = styled.textarea`
  display: block;
  margin: ${(props) => (props.margin ? props.margin : "auto")};
  border: solid 1px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  resize: none;
`;

TextArea.defaultProps = {
  width: "100%",
  height: "200px",
  padding: "5px",
  placeholder: "텍스트를 입력하세요",
  placeholderColor: "gray",
  label: "",
  type: "text",
};

export default TextArea;
