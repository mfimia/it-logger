import { connect } from "react-redux";
import { deleteLog, setCurrent } from "../../actions/logActions";
import { setAlert, clearAlert } from "../../actions/alertActions";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import { Link, Typography, IconButton, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import EditLogModal from "../modals/logs/EditLogModal";

const LogItem = ({
  log,
  deleteLog,
  setCurrent,
  setAlert,
  clearAlert,
  alert,
}) => {
  const { message, techSelected, date, attention, id } = log;
  const { msg, type } = alert;

  console.log(alert);
  const [editModal, setEditModal] = useState(false);

  const handleDelete = () => {
    deleteLog(id);
    setAlert("Log deleted", "success", true);
  };

  const handleClick = () => {
    setCurrent(log);
    setEditModal(true);
  };

  const closeToast = () => {
    clearAlert();
  };

  return (
    <Fragment>
      <ListItem sx={{ width: "50%", mx: "auto" }}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link underline="none" onClick={handleClick} href="#edit-log-modal">
              <Typography
                color={attention ? "error" : "primary"}
                component="span"
              >
                {message}
              </Typography>
            </Link>
          }
          secondary={
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              ID #{id} last updated by {techSelected} on {date}
            </Typography>
          }
        />
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItem>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={msg !== ""}
        autoHideDuration={3000}
        onClose={closeToast}
      >
        <Alert onClose={closeToast} severity={type} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      {editModal && (
        <EditLogModal editModal={editModal} setEditModal={setEditModal} />
      )}
    </Fragment>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, {
  deleteLog,
  setCurrent,
  setAlert,
  clearAlert,
})(LogItem);
