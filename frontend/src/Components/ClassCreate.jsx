import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ClassJoin() {
  const [open, setOpen] = React.useState(false);
  const [className, setClassName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = async () => {
    const universityId = localStorage.getItem("universityId");
    const cls = {
      className: className,
      subject: subject,
      joinCode: code,
      user: universityId,
    };
    await axios.post("http://localhost:4000/classes/create", cls);
    navigate("/teacher");
  };

  return (
    <div>
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Class Create
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Class Name"
            type="email"
            fullWidth
            variant="standard"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subject"
            type="email"
            fullWidth
            variant="standard"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Join Code"
            type="email"
            fullWidth
            variant="standard"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
