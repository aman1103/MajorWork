import { TextField, Grid, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState();
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const q = {
      question: question,
      options: options,
      answer: answer,
    };
    const temp = quiz;
    setQuiz([...temp, q]);
  };

  useEffect(() => {
    const list = [option1, option2, option3, option4];
    setOptions(list);
  }, [option1, option2, option3, option4]);

  const handleSubmitQuiz = async () => {
    const userId = localStorage.getItem("universityId");
    const classId = localStorage.getItem("className");
    // const fullQuiz = new FormData();
    // fullQuiz.append("title", title);
    // fullQuiz.append("startingDate", startingDate);
    // fullQuiz.append("quiz_questions", quiz);
    // fullQuiz.append("authorId", userId);
    // fullQuiz.append("classId", classId);
    console.log(quiz);
    // console.log(fullQuiz);
    await axios.post("http://localhost:4000/quizzes/create", {
      title,
      startingDate,
      quiz_question: quiz,
      authorId: userId,
      classId: classId,
    });
    // navigate({
    //   pathname: "/quiz",
    // });
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "10px", marginLeft: "10px" }}
      >
        <Grid item xs={12}>
          <TextField
            type="text"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="date"
            id="outlined-basic"
            helperText="Starting Date"
            variant="outlined"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
          <Button
            onClick={handleClickOpen}
            sx={{ marginLeft: "10px" }}
            variant="contained"
          >
            Add Question
          </Button>
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
          <Button
            onClick={handleSubmitQuiz}
            sx={{ marginLeft: "10px" }}
            variant="contained"
          >
            Submit Quiz
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent sx={{ overflow: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Question"
            type="text"
            fullWidth
            variant="standard"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent sx={{ overflow: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            label="Option 1"
            fullWidth
            variant="standard"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent sx={{ overflow: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            label="Option 2"
            fullWidth
            variant="standard"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent sx={{ overflow: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            label="Option 3"
            fullWidth
            variant="standard"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent sx={{ overflow: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            label="Option 4"
            fullWidth
            variant="standard"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogContent sx={{ overflow: "hidden" }}>
          <TextField
            id="outlined-select-currency"
            select
            label="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            helperText="Please Select the correct answer"
          >
            {options !== undefined &&
              options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      <br />
      <br />
      <Grid container spacing={1}>
        {quiz !== undefined &&
          quiz.map((quiz, idx) => (
            <>
              <Grid item xs={3}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Q{idx + 1} . {quiz.question}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value={quiz.options[0]}
                      control={<Radio />}
                      label={quiz.options[0]}
                    />
                    <FormControlLabel
                      value={quiz.options[1]}
                      control={<Radio />}
                      label={quiz.options[1]}
                    />
                    <FormControlLabel
                      value={quiz.options[2]}
                      control={<Radio />}
                      label={quiz.options[2]}
                    />
                    <FormControlLabel
                      value={quiz.options[3]}
                      control={<Radio />}
                      label={quiz.options[3]}
                    />
                  </RadioGroup>
                </FormControl>
                <Typography variant="h5">Answer : {quiz.answer}</Typography>
              </Grid>
            </>
          ))}
      </Grid>
    </>
  );
};

export default CreateQuiz;
