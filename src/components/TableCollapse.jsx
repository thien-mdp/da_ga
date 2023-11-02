import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deletePlayer } from "../redux/action/playerActions";

function Row(props) {
  const defaultStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #0000009b",
    boxShadow: 24,
    borderRadius: "6px",
    zIndex: 1600,
    height: "auto",
    width: "auto",
  };
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  const [openModalConfirm, setOpenModalConfirm] = React.useState(false);
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(deletePlayer(row.id));
    setOpenModalConfirm(false);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <FaArrowUp className="w-4 h-4" />
            ) : (
              <FaArrowDown className="w-4 h-4" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row" className="!font-medium ">
          Ván cược của sbd {row.idRed.name} & {row.idBlue.name}
        </TableCell>
        <TableCell component="th" scope="row" className="!font-medium ">
          <IconButton aria-label="edit" size="large">
            <EditIcon fontSize="inherit" color="warning" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => setOpenModalConfirm(!openModalConfirm)}
          >
            <DeleteIcon fontSize="inherit" color="error" />
          </IconButton>
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
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.createAt}
                    </TableCell>
                    <TableCell align="center">{row.idRed.name}</TableCell>
                    <TableCell align="right">
                      {parseInt(row.idRed.tienCuoc).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {parseInt(
                        row.idBlue.tienCuoc - (row.idBlue.tienCuoc * 5) / 100
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.createAt}
                    </TableCell>
                    <TableCell align="center">{row.idBlue.name}</TableCell>
                    <TableCell align="right">
                      {parseInt(row.idBlue.tienCuoc).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {parseInt(
                        row.idRed.tienCuoc - (row.idRed.tienCuoc * 5) / 100
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal
        open={openModalConfirm}
        onClose={() => setOpenModalConfirm(!openModalConfirm)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={defaultStyle}>
          <div className="flex justify-center">
            <form
              onSubmit={onSubmit}
              className="w-[600px] p-10 border border-solid rounded-md"
            >
              <div className="flex justify-around mx-[20%]">
                <button
                  onClick={() => setOpenModalConfirm(false)}
                  type="reset"
                  className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 "
                >
                  <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                    Hủy bỏ
                  </span>
                </button>
                <button
                  type="submit"
                  className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 "
                >
                  <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                    Xác nhận
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ selectedTable }) {
  const playerReducer = useSelector((state) => state.playerReducer.players);
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
            <TableCell className="!font-semibold">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerReducer
            .filter((a, index) => a.tableId === selectedTable.id)
            ?.map((row, index) => (
              <Row key={index} row={row} index={index} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
