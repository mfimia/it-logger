import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

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

const AddTechModal = ({ setAddTech, addTech }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [toast, setToast] = useState(false);
  const closeToast = () => setToast(false);
  const openToast = () => setToast(true);

  const handleClose = () => setAddTech(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "firstName" ? setFirstName(value) : setLastName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "") {
      openToast();
    } else {
      console.log(firstName, lastName);
    }

    // Clear fields
    setFirstName("");
    setLastName("");
  };

  return (
    <Fragment>
      <Modal
        open={addTech}
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toast}
        autoHideDuration={6000}
        onClose={closeToast}
      >
        <Alert onClose={closeToast} severity="error" sx={{ width: "100%" }}>
          Please enter full name!
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default AddTechModal;
