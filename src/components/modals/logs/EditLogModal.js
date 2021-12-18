import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
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
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
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

const EditLogModal = ({ setEditModal, editModal, updateLog, current }) => {
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

  const [toast, setToast] = useState({
    open: false,
    type: null,
  });

  const closeToast = () => {
    setToast((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const openToast = (type) => setToast({ open: true, type: type });

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
      openToast("error");
    } else {
      const updLog = {
        id: current.id,
        message,
        attention,
        techSelected,
        date: new Date(),
      };
      updateLog(updLog);
      openToast("success");
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
                />
              }
            />
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toast.open}
        autoHideDuration={6000}
        onClose={closeToast}
      >
        <Alert
          onClose={closeToast}
          severity={toast.type}
          sx={{ width: "100%" }}
        >
          {toast.type === "success" ? "Log updated" : "Please fill all fields!"}
        </Alert>
      </Snackbar>
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

export default connect(mapStateToProps, { updateLog })(EditLogModal);
