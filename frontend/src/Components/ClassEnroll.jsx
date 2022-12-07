import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function ClassEnroll() {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoin = async () => {
    setOpen(false);
    const universityId = localStorage.getItem("universityId");
    try {
      const response = await axios.post(
        "http://localhost:4000/enrolled_classes/create",
        {
          userId: universityId,
          joinCode: code,
        }
      );
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Class Join
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Join Code (Must be alphanumeric)</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Join Code"
            type="text"
            fullWidth
            autoComplete="off"
            variant="standard"
            onChange={(e) => setCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleJoin}>Join</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
