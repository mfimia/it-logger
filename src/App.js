import { Fragment } from "react";
import "./App.css";
import Logs from "./components/logs/Logs";
import SearchBar from "./components/layout/SearchBar";
import { Box } from "@mui/system";
import AddBtn from "./components/layout/AddBtn";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <SearchBar />
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Logs />
        </Box>
        <AddBtn />
      </Fragment>
    </Provider>
  );
};

export default App;
