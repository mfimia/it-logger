import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { Fragment, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddLogModal from "../modals/logs/AddLogModal";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddTechModal from "../modals/techs/AddTechModal";
import TechListModal from "../modals/techs/TechListModal";

export default function BasicSpeedDial() {
  const [open, setOpen] = useState(false);

  const [addModal, setAddModal] = useState(false);
  const [techModal, setTechModal] = useState(false);
  const [addTechItem, setAddTechItem] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: <PersonIcon color="primary" />,
      name: "Techs",
      click: () => setTechModal(true),
    },
    {
      icon: <PersonAddIcon color="success" />,
      name: "Add Tech",
      click: () => setAddTechItem(true),
    },
    {
      icon: <AddBoxIcon color="secondary" />,
      name: "Add Log",
      click: () => setAddModal(true),
    },
  ];

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        id="name"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.click}
          />
        ))}
      </SpeedDial>
      {addModal && (
        <AddLogModal addModal={addModal} setAddModal={setAddModal} />
      )}
      {addTechItem && (
        <AddTechModal
          addTechItem={addTechItem}
          setAddTechItem={setAddTechItem}
        />
      )}
      {techModal && (
        <TechListModal techModal={techModal} setTechModal={setTechModal} />
      )}
    </Fragment>
  );
}
