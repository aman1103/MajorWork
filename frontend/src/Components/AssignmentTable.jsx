import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function createData(title, marks, startingDate, dueDate) {
  return { title, marks, startingDate, dueDate };
}

export default function AssignmentTable({ assignments }) {
  console.log(assignments);
  let rows = [];
  assignments.map((assignment) => {
    return rows.push(
      createData(
        assignment.title,
        assignment.assignmentMarks,
        assignment.startingDate,
        assignment.dueDate
      )
    );
  });
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
                {row.title}
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
