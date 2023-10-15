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
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <FaArrowUp className="w-4 h-4" /> : <FaArrowDown className="w-4 h-4" />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row" className="!font-medium ">
          Ván cược của sbd {row.idBlue} & {row.idRed}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Thời gian</TableCell>
                    <TableCell align="center">Số báo danh</TableCell>
                    <TableCell align="right">Tiền cược</TableCell>
                    <TableCell align="right">Thực nhận (nếu thắng)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.data?.map((item, index) => (
                    <TableRow key={item.name}>
                      <TableCell component="th" scope="row">
                        {row.createAt}
                      </TableCell>
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell align="right">
                        {parseInt(item.percent).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                      </TableCell>
                      <TableCell align="right">
                        {index === 0
                          ? parseInt(row.data[1].percent - (row.data[1].percent * 5) / 100).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : index === 1
                          ? parseInt(row.data[0].percent - (row.data[0].percent * 5) / 100).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ data }) {
  const rows = data;
  console.log(data);
  return (
    <TableContainer className="!rounded-md" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className="!font-semibold">
            <TableCell width="60" />
            <TableCell width="60" className="!font-semibold">
              STT
            </TableCell>
            <TableCell className="!font-semibold">Ván cược</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <Row key={row.id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
