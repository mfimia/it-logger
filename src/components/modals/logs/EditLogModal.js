import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alertActions";
import PropTypes from "prop-types";
import { updateLog } from "../../../actions/logActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import TechSelectOptions from "../techs/TechSelectOptions";

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

const EditLogModal = ({
  setEditModal,
  editModal,
  updateLog,
  current,
  setAlert,
}) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [techSelected, setTechSelected] = useState("");

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTechSelected(current.techSelected);
    }
    // eslint-disable-next-line
  }, []);

  const handleClose = () => setEditModal(false);

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
      setAlert("Please update all fields!", "error");
    } else {
      const updLog = {
        id: current.id,
        message,
        attention,
        techSelected,
        date: new Date(),
      };
      updateLog(updLog);
      setAlert("Log updated", "success");
    }

    // Clear fields
    setMessage("");
    setAttention(false);
    setTechSelected("");
  };

  return (
    <Fragment>
      <Modal
        open={editModal}
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
            <Box sx={{ display: "flex", alignItems: "center", mb: 8 }}>
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

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog, setAlert })(EditLogModal);
