import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Link,
} from "@mui/material";
import { useEffect } from "react";

const Class = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [date, setDate] = useState();
  const className = localStorage.getItem("className");
  const isTeacher = localStorage.getItem("isTeacher");

  const fetchContent = async () => {
    const tempClassName = localStorage.getItem("className");
    const response = await axios.get(
      `http://localhost:4000/class_contents?classId=${tempClassName}`
    );
    console.log(response.data.classContent);
    setContent(response.data.classContent);
  };

  useEffect(() => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    setDate(today);
    // console.log(date);
    fetchContent();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddFile = () => {
    const temp = files;
    setFiles([...temp, file]);
    setFile("");
  };
  const handleAddContent = async () => {
    const userId = localStorage.getItem("universityId");
    await axios.post("http://localhost:4000/class_contents/create", {
      rawText: text,
      attachedFileUrls: files,
      classId: className,
      userId,
      postedAt: date,
    });
    window.location.reload();
  };
  return (
    <>
      <NavBar className={className} />
      <br />
      <Typography variant="h3">{className} Class</Typography>
      {isTeacher === "true" && (
        <div>
          <Button
            // sx={{ my: 2, color: "white", display: "block" }}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Add Course Content
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Course Content</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Text content"
                type="text"
                fullWidth
                variant="standard"
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoComplete="off"
              />
            </DialogContent>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                label="Add file link"
                fullWidth
                variant="standard"
                value={file}
                onChange={(e) => setFile(e.target.value)}
                autoComplete="off"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAddFile}>Add Link</Button>
              <Button onClick={handleAddContent}>Add content</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <br />
      {content !== undefined &&
        content.map((content, idx) => {
          return (
            <>
              <Typography
                variant="h5"
                sx={{ marginLeft: "10px", marginTop: "10px" }}
              >
                {idx + 1}
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{ marginLeft: "10px", marginTop: "10px" }}
              >
                <Grid item xs={12}>
                  {content.rawText}
                </Grid>
                {content.attachedFileUrls.map((urls) => {
                  return (
                    <Grid item xs={12}>
                      <Link href={urls} target="_blank">
                        Link
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          );
        })}
    </>
  );
};

export default Class;
