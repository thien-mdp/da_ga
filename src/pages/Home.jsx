import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Autocomplete, Avatar, Box, InputLabel, Modal, Tab, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaRegPlusSquare, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import Screen from "../components/Screen";
import CollapsibleTable from "../components/TableCollapse";
import { addPlayer, updatePlayer } from "../redux/action/playerActions";
import { addTable } from "../redux/action/tableActions";
import { addUser, addUsers, updateUser } from "../redux/action/userActions";
import logo from "../data/daga.png";

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

function Home() {
  const [valueTabs, setValueTabs] = useState("0");
  const [soBaoDanhs, setSoBaoDanh] = useState({
    ga1: "",
    ga2: "",
  });
  const [user, setUser] = useState({
    id: "",
    name: "",
    tableId: "",
    tienCuoc: 0,
  });
  const [selectedUser1, setSelectedUser1] = useState({
    id: "",
    name: "",
    tableId: "",
    tienCuoc: 0,
  });
  const [selectedUser2, setSelectedUser2] = useState({
    id: "",
    name: "",
    tableId: "",
    tienCuoc: 0,
  });
  const [selectedTable, setSelectedTable] = useState();
  const [open, setOpen] = useState(false);
  const [openThemBanChoi, setOpenThemBanChoi] = useState(false);
  const [openAddUserToTable, setOpenAddUserToTable] = useState(false);
  const [dataTabs, setDataTabs] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const playerReducer = useSelector((state) => state.playerReducer);
  const [numTabs, setNumTabs] = useState(0); // Số lượng tab ban đầu
  const tableReducer = useSelector((state) => state.tableReducer.tables);
  const userReducer = useSelector((state) => state.userReducer.users);

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

  useEffect(() => {
    setDataTabs(playerReducer?.players?.filter((item) => item.roomID === valueTabs));
  }, [valueTabs, playerReducer?.players]);

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  const handleOnChangeTable = (e) => {
    setSoBaoDanh((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateTab = () => {
    setOpenThemBanChoi(true);
  };

  const handleSaveTable = (e) => {
    e.preventDefault();
    if (numTabs <= 4) {
      const newNumTabs = numTabs + 1;
      const newTabData = {
        id: uuidv4(),
        label: `Bàn chơi ${newNumTabs}`,
        value: `${newNumTabs}`,
        soBaoDanhs: soBaoDanhs,
      };
      const generateNameUser = (name) => {
        if (name < 10) return "00" + name;
        if (name >= 10 && name < 100) return "0" + name;
        return name.toString();
      };
      const defaultUserOfTable = [...Array(999).keys()].map((user) => {
        return {
          id: uuidv4(),
          name: generateNameUser(user + 1),
          tableId: newTabData.id,
        };
      });

      setNumTabs(newNumTabs);
      dispatch(addTable(newTabData));
      setSelectedTable(newTabData);
      dispatch(addUsers(defaultUserOfTable));
      setOpenThemBanChoi(false);
      setValueTabs((parseInt(valueTabs) + 1).toString());
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedDate = now.toLocaleString();
    var handleData = {
      tableId: selectedTable.id,
      idRed: userReducer.find((user) => user.id === selectedUser1.id && user.tableId === selectedTable.id),
      idBlue: userReducer.find((user) => user.id === selectedUser2.id && user.tableId === selectedTable.id),
      createAt: formattedDate,
    };
    if (isEditMode) {
      // Update an existing player
      dispatch(updatePlayer(handleData));
      setOpen(false);
    } else {
      const newPlayer = { id: uuidv4(), ...handleData };
      Toast.fire({
        icon: "success",
        title: "Thêm mới thành công",
      });
      dispatch(addPlayer(newPlayer));
      setOpen(false);
      setSelectedUser1(null);
      setSelectedUser2(null);
    }
  };

  const handleChangeUser = (e) => {
    const newUser = {
      id: uuidv4(),
      name: e.target.value,
      tableId: selectedTable.id,
    };
    setUser(newUser);
  };

  const handleSaveUserToTable = (e) => {
    e.preventDefault();
    dispatch(addUser(user));
    setOpenAddUserToTable(false);
    Toast.fire({
      icon: "success",
      title: "Thêm mới thành công",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Avatar src={logo} alt="logo" sx={{ width: 120, height: 120 }} />
        <p className="text-[#3d0f7d] font-bold ml-2 text-4xl uppercase">Trường gà quốc tế VIETNAM-LAOS </p>
        <Tooltip title="Tối đa 5 bàn chơi">
          <button
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 "
            onClick={handleCreateTab}
          >
            <span className="flex items-center relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
              ➕ Thêm bàn chơi
            </span>
          </button>
        </Tooltip>
      </div>

      <TabContext zIndex={numTabs} value={valueTabs}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tableReducer.map((tab) => (
              <Tab
                onClick={() => {
                  setSelectedTable(tab);
                }}
                key={tab.value}
                label={tab.label}
                value={tab.value}
                className="!rounded-2xl !font-bold !mt-2"
              />
            ))}
          </TabList>
        </Box>
        <div className="bg-[url('./data/dagarmbg.png')] bg-yellow-100 bg-[length:110px_110px] object-cover bg-center min-h-[600px] !rounded-2xl mt-2">
          {tableReducer.map((tab) => (
            <TabPanel key={tab.value} value={tab.value}>
              <div className="flex flex-col items-center justify-center ">
                <div className="w-full flex justify-end gap-3">
                  <button
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 "
                    onClick={() => {
                      setOpenAddUserToTable(true);
                      setSelectedTable(tab);
                    }}
                  >
                    <span className="flex items-center relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                      <FaUserPlus className="mr-2 text-md" /> Thêm người chơi
                    </span>
                  </button>
                  <button
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 "
                    onClick={() => setOpen(true)}
                  >
                    <span className="flex items-center relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                      <FaRegPlusSquare className="mr-2 text-md" /> Tạo mới
                    </span>
                  </button>
                </div>
                <Screen data={dataTabs} soBaoDanhs={tab.soBaoDanhs} selectedTable={selectedTable} />
                <CollapsibleTable selectedTable={selectedTable} />
              </div>
            </TabPanel>
          ))}
        </div>
      </TabContext>
      <Modal
        open={open}
        onClose={() => {
          setOpen(!open);
          setSelectedUser1(null);
          setSelectedUser2(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <form onSubmit={handleSave} className="w-[600px] p-10 border border-solid rounded-md">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <InputLabel className="peer-focus:font-medium absolute text-sm text-gray-500 \ duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Người chơi 1
                  </InputLabel>
                  <Autocomplete
                    id="combo-box-demo"
                    value={selectedUser1}
                    onChange={(e, value) => {
                      setSelectedUser1(value);
                    }}
                    options={userReducer.filter((a) => a !== selectedUser2 && a.tableId === selectedTable.id)}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => <TextField {...params} label="freeSolo" />}
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <InputLabel className="peer-focus:font-medium absolute text-sm text-gray-500 \ duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Người chơi 2
                  </InputLabel>
                  <Autocomplete
                    id="combo-box-demo"
                    onChange={(e, value) => {
                      setSelectedUser2(value);
                    }}
                    options={userReducer.filter((a) => a !== selectedUser1 && a.tableId === selectedTable.id)}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => <TextField {...params} label="freeSolo" />}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name="percentRed"
                    id="percentRed"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={(e) => {
                      const newUser = {
                        ...selectedUser1,
                        tienCuoc: parseInt(e.target.value) * 1000000,
                      };
                      dispatch(updateUser(newUser));
                    }}
                  />
                  <label
                    htmlFor="percentRed"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Đỏ cược
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name="percentBlue"
                    id="percentBlue"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={(e) => {
                      const newUser = {
                        ...selectedUser2,
                        tienCuoc: parseInt(e.target.value) * 1000000,
                      };
                      dispatch(updateUser(newUser));
                    }}
                  />
                  <label
                    htmlFor="percentBlue"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Xanh cược
                  </label>
                </div>
              </div>

              <div className="flex justify-around mx-[20%]">
                <button
                  type="reset"
                  onClick={() => setIsEditMode(true)}
                  className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 "
                >
                  <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                    Reset form
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

      <Modal
        open={openThemBanChoi}
        onClose={() => setOpenThemBanChoi(!openThemBanChoi)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <form onSubmit={handleSaveTable} className="w-[600px] p-10 border border-solid rounded-md">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ga1"
                    id="idRed"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={handleOnChangeTable}
                  />
                  <label
                    htmlFor="idRed"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 \ duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Số báo danh đỏ
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ga2"
                    id="idBlue"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={handleOnChangeTable}
                  />
                  <label
                    htmlFor="idBlue"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Số báo danh xanh
                  </label>
                </div>
              </div>
              <div className="flex justify-around mx-[20%]">
                <button
                  type="reset"
                  // onClick={(e) => setPlayer({})}
                  className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 "
                >
                  <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                    Reset form
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

      <Modal
        open={openAddUserToTable}
        onClose={() => setOpenAddUserToTable(!openAddUserToTable)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <form onSubmit={handleSaveUserToTable} className="w-[600px] p-10 border border-solid rounded-md">
              <div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="name"
                    id="idRed"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={handleChangeUser}
                  />
                  <label
                    htmlFor="idRed"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 \ duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tên người chơi
                  </label>
                </div>
              </div>
              <div className="flex justify-around mx-[20%]">
                <button
                  type="reset"
                  // onClick={(e) => setPlayer({})}
                  className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 "
                >
                  <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                    Reset form
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
    </>
  );
}

export default Home;
