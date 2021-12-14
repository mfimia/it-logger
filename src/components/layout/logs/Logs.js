import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLogs();
    // eslint-disble-next-line
  }, []);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch("/logs");
    const data = await res.json();

    setLogs(data);
    setLoading(false);
  };

  if (loading) {
    return <h4>Loading...</h4>;
  }
  return (
    <List>
      {!loading && logs.length === 0 ? (
        <p>No logs to show...</p>
      ) : (
        logs.map((log) => (
          <ListItem key={log.id}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={log.message}
              secondary={`${log.tech} | ${log.date}`}
            />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default Logs;
