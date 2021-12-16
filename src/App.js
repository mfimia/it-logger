import { Fragment } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Logs from "./components/logs/Logs";
import SearchBar from "./components/layout/SearchBar";
import { Box } from "@mui/system";
import AddBtn from "./components/layout/AddBtn";
// import NotFound from "./pages/NotFound";
// import AddLogModal from "./components/logs/AddLogModal";

const App = () => {
  return (
    <Fragment>
      {/* <Router> */}
      <SearchBar />
      <Box sx={{ flexGrow: 1, maxWidth: 600 }}>
        <Logs />
      </Box>
      <AddBtn />
      {/* <Routes>
          <Route path="/add/log" element={<AddLogModal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router> */}
    </Fragment>
  );
};

export default App;
