import { Fragment } from "react";
import "./App.css";
import Logs from "./components/layout/logs/Logs";
import SearchBar from "./components/layout/SearchBar";
import { Box } from "@mui/system";

const App = () => {
  return (
    <Fragment>
      <SearchBar />
      <Box sx={{ flexGrow: 1, maxWidth: 600 }}>
        <Logs />
      </Box>
    </Fragment>
  );
};

export default App;
