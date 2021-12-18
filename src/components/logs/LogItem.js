import { connect } from "react-redux";
import { deleteLog } from "../../actions/logActions";
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

const LogItem = ({ log, deleteLog }) => {
  const { message, tech, date, attention, id } = log;

  const [toast, setToast] = useState({
    open: false,
    type: null,
  });

  const handleDelete = () => {
    deleteLog(id);
    openToast("success");
  };

  const closeToast = () => {
    console.log("close function called");
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
            <Link underline="none" href="#edit-log-modal">
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
              ID #{id} last updated by {tech} on {date}
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
    </Fragment>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog })(LogItem);
