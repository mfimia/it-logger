import { Fragment, useState, useMemo, useEffect } from "react";
import Logs from "./components/logs/Logs";
import SearchBar from "./components/layout/SearchBar";
import { Box } from "@mui/system";
import AddBtn from "./components/layout/AddBtn";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./App.css";

const App = () => {
  const darkPref = JSON.parse(localStorage.getItem("darkModePref-itLogger"));
  const [mode, setMode] = useState(darkPref || "light");

  useEffect(() => {
    localStorage.setItem("darkModePref-itLogger", JSON.stringify(mode));
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SearchBar mode={mode} toggleTheme={toggleTheme} />
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Logs />
        </Box>
        <AddBtn />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
