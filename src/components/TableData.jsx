import { Divider } from "@mui/material";
import React from "react";

const TableData = ({ data }) => {
  console.log(data);
  return (
    <div className="grid w-9/12 grid-cols-5 gap-4 p-6 mt-5">
      <div className="col-span-2">
        <p className="mb-2 text-xl font-bold text-center text-red-500">Đỏ</p>
      </div>
      <div className="col-span-1" />
      <div className="col-span-2">
        <p className="mb-2 text-xl font-bold text-center text-blue-500">Xanh</p>
      </div>
      <Divider className="col-span-5" />
      {data &&
        data?.map((item) => (
          <>
            <div className="col-span-2">
              <ul className="max-w-md divide-y divide-gray-200 ">
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate ">SBD: {item.idRed}</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">Cược {item.percentRed}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                      {parseInt(item.money).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-2">
              <ul className="max-w-md divide-y divide-gray-200 ">
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate ">SBD: {item.idBlue}</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">Cược {item.percentBlue}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                      {parseInt(item.money).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </>
        ))}
    </div>
  );
};

export default TableData;
