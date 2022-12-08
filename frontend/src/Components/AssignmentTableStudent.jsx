import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";
import { TextField } from "@mui/material";

function createData(title, marks, startingDate, dueDate, url, id) {
  return { title, marks, startingDate, dueDate, url, id };
}

export default function AssignmentTableStudent({ assignments }) {
  console.log(assignments);
  const [value, setValue] = React.useState();
  let rows = [];
  assignments.map((assignment) => {
    return rows.push(
      createData(
        assignment.title,
        assignment.assignmentMarks,
        assignment.startingDate,
        assignment.dueDate,
        assignment.assignmentFileUrl,
        assignment._id
      )
    );
  });

  const handleAssignmentDownload = async (fileurl) => {
    const res = await axios.post(
      "http://localhost:4000/assignments",
      {
        fileurl,
      },
      {
        responseType: "blob",
      }
    );
    fileDownload(res.data, fileurl);
  };

  const handleFileSubmit = async (assignment) => {
    const assignment_id = assignment.id;
    const assignmentFileUrl = value.name;
    const userId = localStorage.getItem("universityId");
    const res = new FormData();
    res.append("assignment_id", assignment_id);
    res.append("assignmentFileUrl", assignmentFileUrl);
    res.append("userId", userId);
    res.append("file", value);
    const response = await axios.post(
      "http://localhost:4000/assignment_responses/create",
      res
    );
    console.log(response);
  };
  //   const isSubmitted = async (assignment) => {
  //     const assignment_id = assignment.id;
  //     const userId = localStorage.getItem("universityId");
  //     const response = await axios.get(
  //       `http://localhost:4000/assignment_responses?userId=${userId}&&assignmentId=${assignment_id}`
  //     );
  //     console.log(response);
  //     return false;
  //   };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Assignment Name</TableCell>
            <TableCell align="right">Marks</TableCell>
            <TableCell align="right">Starting Date</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="center">Responses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Button onClick={() => handleAssignmentDownload(row.url)}>
                  {row.title}
                </Button>
              </TableCell>
              <TableCell align="right">{row.marks}</TableCell>
              <TableCell align="right">{row.startingDate}</TableCell>
              <TableCell align="right">{row.dueDate}</TableCell>
              <TableCell align="right">
                <TextField
                  type="file"
                  onChange={(e) => setValue(e.target.files[0])}
                />
                <Button onClick={() => handleFileSubmit(row)}>
                  Submit Response
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
