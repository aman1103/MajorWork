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

function createData(title, marks, startingDate, dueDate, url) {
  return { title, marks, startingDate, dueDate, url };
}

export default function AssignmentTable({ assignments }) {
  //   console.log(assignments);
  let rows = [];
  assignments.map((assignment) => {
    return rows.push(
      createData(
        assignment.title,
        assignment.assignmentMarks,
        assignment.startingDate,
        assignment.dueDate,
        assignment.assignmentFileUrl
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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Assignment Name</TableCell>
            <TableCell align="right">Marks</TableCell>
            <TableCell align="right">Starting Date</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Responses</TableCell>
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
                <Button>View Responses</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
