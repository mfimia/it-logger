import React, { useEffect, Fragment } from "react";
import List from "@mui/material/List";
import LogItem from "./LogItem";
import CircularIndeterminate from "../layout/CircularIndeterminate";
import { connect } from "react-redux";
import { clearAlert } from "../../actions/alertActions";
import PropTypes from "prop-types";
import { getLogs } from "../../actions/logActions";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

// We destructure the props coming from redux (declared at the end of the component)
const Logs = ({ log, getLogs, clearAlert, alert }) => {
  // We just take the logs and loading properties
  const { logs, loading } = log;
  const { msg, type, open } = alert;

  const closeToast = () => clearAlert();

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <CircularIndeterminate />;
  }
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={closeToast}
      >
        <Alert onClose={closeToast} severity={type} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      <List>
        {!loading && (logs.length === 0 || !logs) ? (
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
              <Skeleton sx={{ my: 1 }} animation={false} />
              <Skeleton sx={{ my: 1 }} animation="wave" />
              <Skeleton sx={{ my: 1 }} />
            </Box>
          </Fragment>
        ) : (
          logs.map((log) => <LogItem key={log._id} log={log} />)
        )}
      </List>
    </Fragment>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

// We bring the whole state here from redux
const mapStateToProps = (state) => ({
  log: state.log,
  alert: state.alert,
});

// We connect the state and actions with the component
export default connect(mapStateToProps, { getLogs, clearAlert })(Logs);
