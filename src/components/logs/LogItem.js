import { connect } from "react-redux";
import { setAlert, clearAlert } from "../../actions/alertActions";
import { deleteLog, setCurrent } from "../../actions/logActions";
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

const LogItem = ({ log, deleteLog, setCurrent, setAlert }) => {
  const { message, techSelected, date, attention, id } = log;

  const [editModal, setEditModal] = useState(false);

  const handleDelete = () => {
    deleteLog(id);
    setAlert("Log deleted", "success");
  };

  const handleClick = () => {
    setCurrent(log);
    setEditModal(true);
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

export default connect(null, {
  deleteLog,
  setCurrent,
  setAlert,
})(LogItem);
