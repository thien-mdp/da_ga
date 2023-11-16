import { Box, Modal } from "@mui/material";

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

const ModalForm = ({ openForm, onCloseForm, children }) => {
  return (
    <Modal
      open={openForm}
      onClose={onCloseForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-center">{children}</div>
      </Box>
    </Modal>
  );
};
export default ModalForm;
