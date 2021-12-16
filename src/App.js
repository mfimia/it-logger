import { Fragment } from "react";
import "./App.css";
import Logs from "./components/logs/Logs";
import SearchBar from "./components/layout/SearchBar";
import { Box } from "@mui/system";
import AddBtn from "./components/layout/AddBtn";

const App = () => {
  return (
    <Fragment>
      <SearchBar />
      <Box sx={{ flexGrow: 1, maxWidth: 600 }}>
        <Logs />
      </Box>
      <AddBtn />
    </Fragment>
  );
};

export default App;
