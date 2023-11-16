import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { FaRegPlusSquare, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import myAxios from "../../api";
import Screen from "../../components/Screen";
import CollapsibleTable from "../../components/TableCollapse";
import { loading } from "../../redux/action/loadingAction";
import { dispatchMessage } from "../../redux/action/messageAction";
import { addTables } from "../../redux/action/tableActions";

const Body = () => {
  const [value, setValue] = useState("1");
  const tables = useSelector((state) => state.tableReducer.tables);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading({ isLoading: true }));
    myAxios
      .get(`tables?date=${new Date().toISOString().slice(0, 10)}`)
      .then((response) => {
        if (response.status < 400) {
          dispatch(addTables(response.data));
        } else {
          dispatch(
            dispatchMessage({ status: "error", message: response.data.message })
          );
        }

        dispatch(loading({ isLoading: false }));
      })
      .catch((error) => {
        dispatch(dispatchMessage({ status: "error", message: error.message }));
      });
  }, [dispatch]);

  useEffect(() => {
    setValue(tables.length.toString());
  }, [tables]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {tables.map((tab, index) => (
            <Tab
              key={index}
              label={`Bàn chơi ${index + 1}`}
              value={(index + 1).toString()}
              className="!rounded-2xl !font-bold !mt-2"
            />
          ))}
        </TabList>
      </Box>
      <div className="bg-[url('./data/dagarmbg.png')] bg-yellow-100 bg-[length:110px_110px] object-cover bg-center min-h-[600px] !rounded-2xl mt-2">
        {tables.map((tab, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            <div className="flex flex-col items-center justify-center ">
              <div className="w-full flex justify-end gap-3">
                <button
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 "
                  onClick={() => {}}
                >
                  <span className="flex items-center relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                    <FaUserPlus className="mr-2 text-md" /> Thêm người chơi
                  </span>
                </button>
                <button
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 "
                  onClick={() => {}}
                >
                  <span className="flex items-center relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                    <FaRegPlusSquare className="mr-2 text-md" /> Tạo mới
                  </span>
                </button>
              </div>
              <Screen selectedTable={tab} />
              <CollapsibleTable selectedTable={tab} />
            </div>
          </TabPanel>
        ))}
      </div>
    </TabContext>
  );
};

export default Body;
