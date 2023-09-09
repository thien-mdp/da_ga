import { Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";

const Screen = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 p-1 rounded-lg w-2/3">
      <div className="bg-sky-100 text-center w-full rounded-md p-8">
        <Typography variant="h3" component="h2">
          Chọn bên thắng
        </Typography>
        <RadioGroup>
          <div className="!flex !flex-wrap !justify-center !my-5 !w-full">
            <Radio
              className="w-[40%] !rounded-none"
              value={1}
              icon={
                <div className="w-full p-6 m-3 text-white bg-rose-500 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
                  <div className="w-full flex items-center flex-col text-[24px]">Đỏ</div>
                </div>
              }
              checkedIcon={
                <div className="w-full p-6 m-3 text-white bg-rose-700 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
                  <div className="w-full flex items-center flex-col text-[24px]">Đỏ</div>
                </div>
              }
            />
            <Radio
              className="w-[40%] !rounded-none"
              value={2}
              icon={
                <div className="w-full p-6 m-3 text-white bg-blue-600 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
                  <div className="w-full flex items-center flex-col text-[24px]">Xanh</div>
                </div>
              }
              checkedIcon={
                <div className="w-full p-6 m-3 text-white bg-blue-800 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
                  <div className="w-full flex items-center flex-col text-[24px]">Xanh</div>
                </div>
              }
            />
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Screen;
