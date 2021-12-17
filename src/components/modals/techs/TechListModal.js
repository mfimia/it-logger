import { useState, useEffect } from "react";
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

const TechListModal = ({ techs, setTechs }) => {
  const [loading, setLoading] = useState(false);
  const [techItems, setTechItems] = useState([]);

  useEffect(() => {
    getTechs();
    // eslint-disble-next-line
  }, []);

  const handleClose = () => setTechs(false);

  const getTechs = async () => {
    setLoading(true);
    const res = await fetch("/techs");
    const data = await res.json();

    setTechItems(data);
    setLoading(false);
  };

  return (
    <Modal
      open={techs}
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
        <List>
          {!loading &&
            techItems.map((tech) => <TechItem key={tech.id} tech={tech} />)}
        </List>
      </Box>
    </Modal>
  );
};

export default TechListModal;
