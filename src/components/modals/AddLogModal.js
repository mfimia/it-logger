import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const techs = [
  {
    value: "Perro",
  },
  {
    value: "Chul",
  },
  {
    value: "Compi",
  },
  {
    value: "Bro",
  },
];

const AddLogModal = ({ setAddModal, addModal }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const handleClose = () => setAddModal(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "attention") {
      setAttention((prev) => !prev);
    } else {
      name === "message" ? setMessage(value) : setTech(value);
    }
  };

  return (
    <Modal
      open={addModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          align="center"
          id="modal-modal-title"
          variant="h4"
          component="h4"
        >
          Enter system log
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 8 }}>
            <AccountCircle
              sx={{ color: "action.active", mr: 2, my: 0.5, pt: 3 }}
            />
            <TextField
              onChange={handleChange}
              label="Log message"
              variant="standard"
              name="message"
              value={message}
            />
          </Box>
          <TextField
            select
            label="Select tech"
            name="tech"
            size="small"
            value={tech}
            onChange={handleChange}
            sx={{ width: 200 }}
          >
            {techs.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            label="Needs attention"
            control={
              <Checkbox
                name="attention"
                checked={attention}
                onChange={handleChange}
              />
            }
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AddLogModal;
