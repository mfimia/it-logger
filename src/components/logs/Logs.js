import React, { useEffect } from "react";
import List from "@mui/material/List";
import LogItem from "./LogItem";
import CircularIndeterminate from "../layout/CircularIndeterminate";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLogs } from "../../actions/logActions";

// We destructure the props coming from redux (declared at the end of the component)
const Logs = ({ log, getLogs }) => {
  // We just take the logs and loading properties
  const { logs, loading } = log;

  useEffect(() => {
    getLogs();
    // eslint-disble-next-line
  }, []);

  if (loading || logs === null) {
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

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

// We bring the whole state here from redux
const mapStateToProps = (state) => ({
  log: state.log,
});

// We connect the state and actions with the component
export default connect(mapStateToProps, { getLogs })(Logs);
