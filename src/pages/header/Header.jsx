import { Avatar, Tooltip } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import myAxios from "../../api";
import Form from "../../components/Form";
import ModalForm from "../../components/Modal";
import logo from "../../data/dagarmbg.png";
import { loading } from "../../redux/action/loadingAction";
import { dispatchMessage } from "../../redux/action/messageAction";
import { addTable } from "../../redux/action/tableActions";
import ButtonGroup from "./components/ButtonGroup";

const Header = () => {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();

  const onCloseForm = () => {
    setOpenForm(!openForm);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const chickenRed = event.target.chickenRed.value;
    const chickenBlue = event.target.chickenBlue.value;

    dispatch(loading({ isLoading: true }));

    myAxios
      .post("/tables", {
        name_chicken_red: chickenRed,
        name_chicken_blue: chickenBlue,
      })
      .then((response) => {
        if (response.status < 400) {
          dispatch(addTable(response.data));
          dispatch(
            dispatchMessage({
              status: "success",
              message: "Create table success",
            })
          );
          setOpenForm(false);
        } else {
          dispatch(
            dispatchMessage({
              status: "error",
              message: response.data.message,
            })
          );
        }
        dispatch(loading({ isLoading: false }));
      })
      .catch((error) => {
        dispatch(
          dispatchMessage({
            status: "error",
            message: error.message,
          })
        );
        dispatch(loading({ isLoading: false }));
      });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Avatar src={logo} alt="logo" sx={{ width: 120, height: 120 }} />
        <p className="text-[#3d0f7d] font-bold ml-2 text-4xl uppercase">
          ⭐ Trường gà quốc tế VIETNAM-LAOS ⭐
        </p>
        <Tooltip title="Tối đa 5 bàn chơi">
          <button
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 "
            onClick={() => setOpenForm(true)}
          >
            <span className="flex items-center relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
              ➕ Thêm bàn chơi
            </span>
          </button>
        </Tooltip>
      </div>

      <ModalForm openForm={openForm} onCloseForm={onCloseForm}>
        <Form onSubmit={(event) => onSubmit(event)}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Tên gà đỏ"
                name="chickenRed"
                id="chickenRed"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Tên gà xanh"
                name="chickenBlue"
                id="chickenBlue"
                required
              />
            </div>
          </div>
          <ButtonGroup />
        </Form>
      </ModalForm>
    </>
  );
};

export default Header;
