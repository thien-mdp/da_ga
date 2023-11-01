import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Screen = ({ soBaoDanhs, selectedTable }) => {
  const [open, setOpen] = useState(false);
  const playerReducer = useSelector((state) => state.playerReducer.players);
  const userReducer = useSelector((state) => state.userReducer.users);
  const [list, setList] = useState([]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    width: 320,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const caculate = (thang) => {
    const filterUserFromTable = userReducer.filter(
      (a) => a.tableId === selectedTable.id
    );
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
    setList(tong);
  };

  const chooseRed = () => {
    Swal.fire({
      title: "Xác nhận chọn Đỏ thắng?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire({
          icon: "success",
          title: "Đỏ thắng!",
        });
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
        Toast.fire({
          icon: "success",
          title: "Xanh thắng!",
        });
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
    height: "auto",
    width: "auto",
  };

  return (
    <>
      <div className="w-2/3 p-1 my-4 rounded-lg bg-gradient-to-r from-indigo-200 to-cyan-200">
        <div className="w-full p-8 text-center rounded-md bg-sky-100">
          <div className="flex flex-row items-center justify-around	 w-full h-full">
            <div>
              <div className="font-black text-5xl">Gà</div>
              <div>{soBaoDanhs.ga1}</div>
            </div>
            <div>
              <div className="font-black text-5xl">Gà</div>
              <div>{soBaoDanhs.ga2}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 !my-5 !w-full">
            <Button onClick={chooseRed} className="w-full !p-0 !rounded-2xl">
              <div className="flex items-center justify-center w-full h-full p-6 text-5xl text-white bg-rose-400 rounded-2xl">
                Đỏ
              </div>
            </Button>
            <Button onClick={chooseBlue} className="w-full !p-0 !rounded-2xl">
              <div className="flex items-center justify-center w-full h-full p-6 text-5xl text-gray-800 bg-blue-400 rounded-2xl">
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
          <div className="flex justify-center">
            <div className="w-[600px] p-10 border border-solid rounded-md">
              {list.map((value, index) => {
                return (
                  <div key={index}>
                    {value.name}: {value.total}
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Screen;
