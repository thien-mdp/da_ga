import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

export default function Loading() {
  const isLoading = useSelector((state) => state.loadingReducer.isLoading);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => {}}
      >
        <Stack gap={1} justifyContent="center" alignItems="center">
          <CircularProgress size={50} color="inherit" />
          <Typography>Loading...</Typography>
        </Stack>
      </Backdrop>
    </div>
  );
}
