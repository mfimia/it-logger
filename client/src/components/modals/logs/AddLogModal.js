import { useState, Fragment } from "react";
import TechSelectOptions from "../techs/TechSelectOptions";
// We gonna use redux, so we need to import connnect
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Importing action from redux
import { addLog } from "../../../actions/logActions";
import { setAlert } from "../../../actions/alertActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

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

const AddLogModal = ({ setAddModal, addModal, addLog, setAlert }) => {
  // It's a form, so we will have always our component-level state
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [techSelected, setTechSelected] = useState("");

  const handleClose = () => setAddModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "attention") {
      setAttention((prev) => !prev);
    } else {
      name === "message" ? setMessage(value) : setTechSelected(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "" || techSelected === "") {
      setAlert("Please fill all fields!", "error");
    } else {
      const newLog = {
        message,
        attention,
        techSelected,
        date: new Date(),
      };

      // Add log and display toast
      addLog(newLog);
      setAlert("Log added", "success");

      // Clear fields
      setMessage("");
      setAttention(false);
      setTechSelected("");
    }
  };

  return (
    <Fragment>
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
              mt: 2,
            }}
            onSubmit={handleSubmit}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <SendIcon
                sx={{ color: "action.active", mr: 2, my: 0.5, pt: 3 }}
              />
              <TextField
                onChange={handleChange}
                label="Log message"
                variant="standard"
                name="message"
                value={message}
                required
              />
            </Box>
            <TechSelectOptions
              techSelected={techSelected}
              handleChange={handleChange}
            />
            <FormControlLabel
              label="Needs attention"
              control={
                <Checkbox
                  name="attention"
                  checked={attention}
                  onChange={handleChange}
                  sx={{ my: 4 }}
                />
              }
            />
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

// We are not adding state, jsut an action. So we just call null first and then the action
export default connect(null, { addLog, setAlert })(AddLogModal);
