import React from "react";
import { Button } from "../elements";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../app/services/imageReducer";
import styled from "styled-components";

const Upload = (props) => {
  const is_uploading = useSelector((state) => state.image.uploading);
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const [upload, setUpload] = React.useState(false);
  const selectFile = (e) => {
    console.log(e.target.files);
    console.log(fileInput.current.files[0]);
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
    setUpload(true);
  };
  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };
  return (
    <React.Fragment>
      <Wrap>
        <input
          style={{ margin: "15px" }}
          type="file"
          onChange={selectFile}
          ref={fileInput}
          disabled={is_uploading}
        />
        {upload === false ? (
          <Button
            width="160px"
            backgroundColor="gray"
            onClick={() => alert("파일을 선택해주세요!")}
          >
            파일을 선택해주세요
          </Button>
        ) : (
          <Button width="160px" onClick={uploadFB}>
            업로드하기
          </Button>
        )}
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  justify-items: center;
  padding: 20px;
`;

export default Upload;
