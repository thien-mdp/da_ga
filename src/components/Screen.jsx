import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { dispatchMessage } from "../redux/action/messageAction";

const Screen = ({ selectedTable }) => {
  const [open, setOpen] = useState(false);
  const playerReducer = useSelector((state) => state.playerReducer.players);
  const userReducer = useSelector((state) => state.userReducer.users);
  const [list, setList] = useState({});
  const dispatch = useDispatch();

  const caculate = (thang) => {
    const filterUserFromTable = userReducer.filter(
      (a) => a.tableId === selectedTable.id
    );
    let hoaHong = 0;
    const tong = filterUserFromTable.map((a) => {
      let total = 0;
      if (thang === "RED") {
        const filterUserSelectedRedPlayerTable = playerReducer.filter(
          (b) => b.idRed.id === a.id && b.tableId === selectedTable.id
        );
        const sum = filterUserSelectedRedPlayerTable.reduce(
          (acc, current) =>
            acc +
            parseInt(
              current.idBlue.tienCuoc - (current.idBlue.tienCuoc * 5) / 100
            ),
          0
        );
        hoaHong = filterUserSelectedRedPlayerTable.reduce(
          (acc, current) => acc + parseInt((current.idBlue.tienCuoc * 5) / 100),
          hoaHong
        );
        const filterUserSelectedBluePlayerTable = playerReducer.filter(
          (b) => b.idBlue.id === a.id && b.tableId === selectedTable.id
        );
        total = filterUserSelectedBluePlayerTable.reduce(
          (acc, current) => acc - parseInt(current.idBlue.tienCuoc),
          sum
        );
      } else {
        const filterUserSelectedBluePlayerTable = playerReducer.filter(
          (b) => b.idBlue.id === a.id && b.tableId === selectedTable.id
        );
        const sum = filterUserSelectedBluePlayerTable.reduce(
          (acc, current) =>
            acc +
            parseInt(
              current.idRed.tienCuoc - (current.idRed.tienCuoc * 5) / 100
            ),
          0
        );
        hoaHong = filterUserSelectedBluePlayerTable.reduce(
          (acc, current) => acc + parseInt((current.idRed.tienCuoc * 5) / 100),
          hoaHong
        );
        const filterUserSelectedRedPlayerTable = playerReducer.filter(
          (b) => b.idRed.id === a.id && b.tableId === selectedTable.id
        );
        total = filterUserSelectedRedPlayerTable.reduce(
          (acc, current) => acc - parseInt(current.idRed.tienCuoc),
          sum
        );
      }
      return {
        name: a.name,
        total: total,
      };
    });
    setList({ hoaHong: hoaHong, tong: tong });
  };

  const chooseRed = () => {
    Swal.fire({
      title: "Xác nhận chọn Đỏ thắng?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(dispatchMessage({ status: "success", message: "Đỏ thắng" }));
        setOpen(true);
        caculate("RED");
      }
    });
  };
  const chooseBlue = () => {
    Swal.fire({
      title: "Xác nhận chọn Xanh thắng?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(dispatchMessage({ status: "success", message: "Xanh thắng" }));
      }
      setOpen(true);
      caculate("BLUE");
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #0000009b",
    boxShadow: 24,
    borderRadius: "6px",
    zIndex: 1600,
    width: "auto",
    overflow: "scroll",
    height: "50%",
  };

  return (
    <>
      {/* <div className="w-2/3 p-1 my-4 rounded-lg bg-gradient-to-r from-indigo-200 to-cyan-200"> */}
      <div className="w-2/3 p-1 my-4 rounded-lg bg-[#ffffffbc]">
        <div className="w-full p-8 text-center rounded-md ">
          <div className="flex flex-row items-center justify-around	 w-full h-full">
            <div className="font-black text-[#da0f1f]">
              <div className="text-5xl ">Gà</div>
              <div className="text-2xl font-semibold">
                {selectedTable?.name_chicken_red ?? ""}
              </div>
            </div>
            <div className="font-black text-[#0f59ae]">
              <div className="text-5xl  ">Gà</div>
              <div className="text-2xl font-semibold">
                {selectedTable?.name_chicken_blue ?? ""}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 !my-5 !w-full">
            <Button onClick={chooseRed} className="w-full !p-0 !rounded-2xl">
              <div className="flex items-center justify-center w-full h-full p-6 text-5xl text-white bg-[#da0f1f] rounded-2xl">
                Đỏ
              </div>
            </Button>
            <Button onClick={chooseBlue} className="w-full !p-0 !rounded-2xl">
              <div className="flex items-center justify-center w-full h-full p-6 text-5xl text-white bg-[#0f59ae] rounded-2xl">
                <div>Xanh</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Chi tiết
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    HOA HỒNG:{" "}
                    {list.hoaHong?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell>Tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.tong
                  ?.filter((value) => value.total !== 0)
                  ?.map((value, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{value.name}</TableCell>
                        <TableCell>
                          {value.total.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
};

export default Screen;
