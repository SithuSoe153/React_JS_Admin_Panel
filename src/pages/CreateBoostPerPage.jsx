import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination
import { Chip } from "@mui/material";

function createData(
  guid,
  name,
  generatedId,
  boostSetting,
  type,
  duration,
  price,
  totalPrice,
  facility,
  createdOn,
  description,
  createdBy
) {
  return {
    guid,
    name,
    generatedId,
    boostSetting,
    type,
    duration,
    price,
    totalPrice,
    facility,
    createdOn,
    description,
    createdBy,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.generatedId}</TableCell>
        <TableCell align="center">
          <Chip label="primary" color="primary" />
        </TableCell>
        <TableCell align="right">{row.duration}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.totalPrice}</TableCell>
        <TableCell align="right">{row.createdOn}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, width: "100%" }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Table size="small" aria-label="details" sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Facility</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Created On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.guid}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.facility}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.createdBy}</TableCell>
                    <TableCell>{row.createdOn}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const rows = [
  createData(
    1023,
    "Frozen yoghurt",
    "LV-159",
    "Live Only",
    "Live",
    5,
    3.99,
    9.88,
    500,
    "10/10/2024",
    "Age between 18-20",
    "Sithu Soe"
  ),
];

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0); // Page state
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // Rows per page state

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when rows per page change
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Profile Name</TableCell>
              <TableCell align="right">Generated ID</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Implement pagination */}
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row key={row.name} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add pagination controls */}
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[2, 5, 10]}
      />
    </Paper>
  );
}
