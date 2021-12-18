import React, { useEffect, Fragment } from "react";
import List from "@mui/material/List";
import LogItem from "./LogItem";
import CircularIndeterminate from "../layout/CircularIndeterminate";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLogs } from "../../actions/logActions";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

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
        <Fragment>
          <Typography textAlign="center" variant="h4" component="h4">
            No logs to show
          </Typography>
          <Box
            sx={{
              width: "50%",
              mx: "auto",
              my: 2,
            }}
          >
            <Skeleton sx={{ my: 1 }} />
            <Skeleton sx={{ my: 1 }} animation="wave" />
            <Skeleton sx={{ my: 1 }} animation={false} />
          </Box>
        </Fragment>
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
