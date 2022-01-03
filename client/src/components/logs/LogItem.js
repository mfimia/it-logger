import { connect } from "react-redux";
import { setAlert } from "../../actions/alertActions";
import { deleteLog, setCurrent } from "../../actions/logActions";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Link, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLogModal from "../modals/logs/EditLogModal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const LogItem = ({ log, deleteLog, setCurrent, setAlert, index }) => {
  const { message, techSelected, date, attention, _id } = log;

  const [editModal, setEditModal] = useState(false);

  const handleDelete = () => {
    deleteLog(_id);
    setAlert("Log deleted", "success");
  };

  const handleClick = () => {
    setCurrent(log);
    setEditModal(true);
  };

  return (
    <Fragment>
      <ListItem
        sx={{
          width: {
            xs: "80%",
            sm: "70%",
            md: "45%",
            xl: "35%",
          },
          mx: "auto",
        }}
      >
        <ListItemAvatar>
          <ErrorOutlineIcon fontSize="large" />
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
              ID #{index} last updated by {techSelected} on {date}
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
