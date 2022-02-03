import React from "react";
import { Button } from "../elements";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../app/services/imageReducer";

const Upload = (props) => {
  const is_uploading = useSelector((state) => state.image.uploading);
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const selectFile = (e) => {
    console.log(e.target.files);
    console.log(fileInput.current.files[0]);
    const reader = new FileReader();
    const file = fileInput.current.files[0];
  };
  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };
  return (
    <React.Fragment>
      <input
        type="file"
        onChange={selectFile}
        ref={fileInput}
        disabled={is_uploading}
      />
      <Button onClick={uploadFB}>업로드하기</Button>
    </React.Fragment>
  );
};

export default Upload;
