import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { resetMessage } from "../redux/action/messageAction";

const Toast = () => {
  const toast = Swal.mixin({
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
  const { status, message } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== "" && message !== "") {
      toast.fire({
        icon: status,
        title: message,
      });
      setTimeout(() => {
        dispatch(resetMessage());
      }, 1000);
    }
  }, [dispatch, toast, status, message]);
  return <></>;
};

export default Toast;
