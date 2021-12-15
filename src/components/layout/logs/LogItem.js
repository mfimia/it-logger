import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import { Link, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const LogItem = ({ log }) => {
  const { message, tech, date, attention, id } = log;
  return (
    <ListItem>
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
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default LogItem;
