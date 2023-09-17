import { Button, Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

const Screen = () => {
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

  const chooseRed = () => {
    Swal.fire({
      title: "Xác nhận chọn Đỏ thắng?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Toast.fire({
          icon: "success",
          title: "Đỏ thắng!",
        });
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
    });
  };
  return (
    <div className="w-2/3 p-1 rounded-lg bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="w-full p-8 text-center rounded-md bg-sky-100">
        <Typography variant="h3" component="h2">
          Chọn bên thắng
        </Typography>

        <div className="!flex !flex-wrap !justify-between !my-5 !w-full">
          <Button onClick={chooseRed} className="w-[40%] !p-0 !rounded-2xl">
            <div className="w-full p-6 text-white bg-rose-500 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
              Đỏ
            </div>
          </Button>
          <Button onClick={chooseBlue} className="w-[40%] !p-0 !rounded-2xl">
            <div className="w-full p-6 text-white bg-blue-500 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
              Xanh
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Screen;
