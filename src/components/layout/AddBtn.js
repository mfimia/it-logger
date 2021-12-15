import { Button } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { Fragment, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function BasicSpeedDial() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        size="medium"
        sx={{
          position: "absolute",
          bottom: 24,
          right: 24,
          borderRadius: "50%",
          height: 60,
        }}
        onClick={handleOpen}
      >
        <SpeedDialIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Fragment>
  );
}
