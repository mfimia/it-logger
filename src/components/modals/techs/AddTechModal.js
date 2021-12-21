import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alertActions";
import { addTech } from "../../../actions/techActions";

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

const AddTechModal = ({ setAddTechItem, addTechItem, setAlert, addTech }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClose = () => setAddTechItem(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "firstName" ? setFirstName(value) : setLastName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "") {
      setAlert("Please enter full name!", "error");
    } else {
      addTech({
        firstName,
        lastName,
      });
    }
    setAlert("Tech added", "success");
    // Clear fields
    setFirstName("");
    setLastName("");
  };

  return (
    <Fragment>
      <Modal
        open={addTechItem}
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
            New technician
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
            <TextField
              onChange={handleChange}
              label="First name"
              variant="standard"
              name="firstName"
              value={firstName}
              required
            />
            <TextField
              onChange={handleChange}
              label="Last name"
              variant="standard"
              name="lastName"
              value={lastName}
              required
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

AddTechModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addTech: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, addTech })(AddTechModal);
