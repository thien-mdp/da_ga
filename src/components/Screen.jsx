import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Screen = ({ data }) => {
  const [total, setTotal] = useState();
  useEffect(() => {
    // Tính tổng tiền từ mảng data
    const money = data.map((item) => parseFloat(item.money)); // Chuyển chuỗi thành số
    const sum = money.reduce((acc, current) => acc + current, 0);

    // Cập nhật giá trị total bằng tổng tiền
    setTotal(sum);
  }, [data]);
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
    <div className="w-2/3 p-1 my-4 rounded-lg bg-gradient-to-r from-indigo-200 to-cyan-200">
      <div className="w-full p-8 text-center rounded-md bg-sky-100">
        {/* <p> Tổng cược : {total?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p> */}
        <div className="grid grid-cols-2 gap-6 !my-5 !w-full">
          <Button onClick={chooseRed} className="w-full !p-0 !rounded-2xl">
            <div className="flex items-center justify-center w-full h-full p-6 text-5xl text-white bg-rose-400 rounded-2xl">
              Đỏ
            </div>
          </Button>
          <Button onClick={chooseBlue} className="w-full !p-0 !rounded-2xl">
            <div className="flex items-center justify-center w-full h-full p-6 text-5xl text-gray-800 bg-blue-400 rounded-2xl">
              Xanh
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Screen;
