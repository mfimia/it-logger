import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTechs } from "../../../actions/techActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { List } from "@mui/material";
import TechItem from "./TechItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TechListModal = ({ techModal, setTechModal, getTechs, tech }) => {
  const { techs, loading } = tech;
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  const handleClose = () => setTechModal(false);

  return (
    <Modal
      open={techModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          align="center"
          id="modal-modal-title"
          variant="h4"
          component="h4"
        >
          Technician List
        </Typography>
        <List sx={{ mt: 4 }}>
          {!loading &&
            techs !== null &&
            techs.map((tech) => <TechItem key={tech.id} tech={tech} />)}
        </List>
      </Box>
    </Modal>
  );
};

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
