import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { getTechs } from "../../../actions/techActions";
import { TextField } from "@mui/material";

const TechSelectOptions = ({ getTechs, tech, handleChange, techSelected }) => {
  const { techs, loading } = tech;
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);
  return (
    !loading &&
    techs !== null && (
      <TextField
        select
        label="Select tech"
        name="tech"
        size="small"
        value={techSelected}
        onChange={handleChange}
        sx={{ width: 200 }}
        required
      >
        {techs.map((t) => (
          <MenuItem key={t.id} value={`${t.firstName} ${t.lastName}`}>
            {t.firstName} {t.lastName}
          </MenuItem>
        ))}
      </TextField>
    )
  );
};

TechSelectOptions.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechSelectOptions);
