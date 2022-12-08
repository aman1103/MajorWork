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

export default function CreateAssignment({ className }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState();
  const [marks, setMarks] = React.useState(0);
  const [startingDate, setStartingDate] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = async () => {
    console.log(file);
    const authorId = localStorage.getItem("universityId");
    const formData = new FormData();
    formData.append("filename", file.name);
    formData.append("name", name);
    formData.append("marks", marks);
    formData.append("file", file);
    formData.append("startingDate", startingDate);
    formData.append("dueDate", dueDate);
    formData.append("authorId", authorId);
    formData.append("classId", className);
    console.log(formData);
    axios.post("http://localhost:4000/assignments/create", formData);
    handleClose();
    window.location.reload();
  };

  return (
    <div>
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Upload New Assignment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Assignment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="file"
            fullWidth
            variant="standard"
            onChange={(e) => setFile(e.target.files[0])}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="marks"
            type="number"
            fullWidth
            variant="standard"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            helperText="Starting Date"
            type="date"
            fullWidth
            variant="standard"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="date"
            helperText="Due Date"
            fullWidth
            variant="standard"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
