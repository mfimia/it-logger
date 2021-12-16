import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { Fragment, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddLogModal from "../modals/AddLogModal";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function BasicSpeedDial() {
  const [open, setOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [techs, setTechs] = useState(false);
  const [addTech, setAddTech] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: <PersonIcon color="primary" />,
      name: "Techs",
      click: () => console.log("hi people"),
    },
    {
      icon: <PersonAddIcon color="success" />,
      name: "Add Tech",
      click: () => console.log("hi add"),
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
    </Fragment>
  );
}
