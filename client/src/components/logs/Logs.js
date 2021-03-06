import React, { useEffect, Fragment, useState } from "react";
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

const styles = {
  margin: { my: 1 },
};

const skeletons = [
  { animation: false },
  { animation: "wave" },
  { animation: false },
  { animation: "wave" },
  { animation: false },
  { animation: "wave" },
];

const placeholder = skeletons.map((s) => (
  <Skeleton sx={styles.margin} animation={s.animation} />
));

// We destructure the props coming from redux (declared at the end of the component)
const Logs = ({ log, getLogs, clearAlert, alert, inputValue }) => {
  // We just take the logs and loading properties
  const { logs, loading } = log;
  const { msg, type, open } = alert;
  const [filteredLogs, setFilteredLogs] = useState([]);

  const closeToast = () => clearAlert();

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (inputValue === "") {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(
        logs.filter((l) => {
          return ["message", "techSelected", "date"].some((key) => {
            return l[key].includes(inputValue);
          });
        })
      );
    }
  }, [inputValue, logs]);

  if (loading) {
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
              {placeholder}
            </Box>
          </Fragment>
        ) : (
          filteredLogs.map((log, index) => (
            <LogItem index={index + 1} key={index} log={log} />
          ))
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
