import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { actionCreators as postActions } from "../app/services/postReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Delete(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(props.id);
  React.useEffect(() => {
    dispatch(postActions.getPostFB());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    dispatch(postActions.deletePostFB(props.id));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        삭제
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"정말로 삭제하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            만약 삭제 버튼을 누르시면 더 이상 데이터 복구가 불가능합니다.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            그래도 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <CancelIcon /> 취소
          </Button>
          <Button onClick={handleDelete} autoFocus color="error">
            <DeleteIcon /> 삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
