import PropTypes from "prop-types";
import { Fragment } from "react";
import { connect } from "react-redux";
import { deleteTech } from "../../../actions/techActions";
import { setAlert } from "../../../actions/alertActions";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const TechItem = ({ tech, deleteTech, setAlert }) => {
  const { firstName, lastName, _id } = tech;

  const handleClick = () => {
    deleteTech(_id);
    setAlert("Tech deleted", "success");
  };

  return (
    <Fragment>
      <ListItem sx={{ width: "60%", margin: "auto" }}>
        <ListItemAvatar>
          <AssignmentIndIcon fontSize="large" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="span">
              {firstName} {lastName}
            </Typography>
          }
        />
        <IconButton aria-label="delete" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </Fragment>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
  getTechs: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { deleteTech, setAlert })(TechItem);
