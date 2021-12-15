import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import LogItem from "./LogItem";
import CircularIndeterminate from "../CircularIndeterminate";

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
    return <CircularIndeterminate />;
  }
  return (
    <List>
      {!loading && logs.length === 0 ? (
        <p>No logs to show...</p>
      ) : (
        logs.map((log) => <LogItem key={log.id} log={log} />)
      )}
    </List>
  );
};

export default Logs;
