import { connect } from "react-redux";
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

const LogItem = ({ log, deleteLog, setCurrent }) => {
  const { message, techSelected, date, attention, id } = log;

  const [toast, setToast] = useState({
    open: false,
    type: null,
  });

  const [editModal, setEditModal] = useState(false);

  const handleDelete = () => {
    deleteLog(id);
    openToast("success");
  };

  const handleClick = () => {
    setCurrent(log);
    setEditModal(true);
  };

  const closeToast = () => {
    setToast((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const openToast = (type) => setToast({ open: true, type: type });

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
        open={toast.open}
        autoHideDuration={6000}
        onClose={closeToast}
      >
        <Alert
          onClose={closeToast}
          severity={toast.type}
          sx={{ width: "100%" }}
        >
          Log deleted
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

export default connect(null, { deleteLog, setCurrent })(LogItem);
