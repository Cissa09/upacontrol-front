import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Agenda from "./Agenda/Agenda";
import Especialidade from "./Especialidade/Especialidade";
import Medico from "./Medico/Medico";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LinearProgress from "@mui/material/LinearProgress";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function Dashboard(props) {
  const [open, setOpen] = useState(true);
  const [menuRender, setMenuRender] = useState(1);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  let history = useHistory();

  const handleLogout = () => {
    history.push("/login");
  };

  const handleMenuClick = (value) => {
    setMenuRender(value);
  };

  const handleAddClick = (type) => {
    props.dispatch({ type: `set_edit_${type}`, payload: {} });
    props.dispatch({
      type: `set_render_list_${type}`,
      payload: !props.state[type]?.renderList,
    });
  };

  const renderContent = (value) => {
    switch (value) {
      case 1:
        return {
          component: <Agenda state={props.state} dispatch={props.dispatch} />,
          header: (
            <>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {props.state.user?.type === "paciente"
                  ? "Agendamentos"
                  : "Agenda"}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleAddClick("agenda")}
              >
                {props.state.agenda?.renderList ? (
                  <AddIcon />
                ) : (
                  <FormatListBulletedIcon />
                )}
              </IconButton>
            </>
          ),
        };
      case 2:
        return {
          component: (
            <Especialidade state={props.state} dispatch={props.dispatch} />
          ),
          header: (
            <>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Especialidades
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleAddClick("especialidades")}
                // sx={{
                //   marginRight: "36px",
                //   ...(open && { display: "none" }),
                // }}
              >
                {props.state.especialidades?.renderList ? (
                  <AddIcon />
                ) : (
                  <FormatListBulletedIcon />
                )}
              </IconButton>
            </>
          ),
        };
      case 3:
        return {
          component: <Medico state={props.state} dispatch={props.dispatch} />,
          header: (
            <>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Médicos
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleAddClick("medicos")}
              >
                {props.state.medicos?.renderList ? (
                  <AddIcon />
                ) : (
                  <FormatListBulletedIcon />
                )}
              </IconButton>
            </>
          ),
        };
      default:
        return <div>12331232</div>;
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              UBS-CONTROL
            </Typography>
            <IconButton onClick={() => handleLogout()} color="inherit">
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <div>
              <ListItem button onClick={() => handleMenuClick(1)}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Agenda" />
              </ListItem>
              {props.state.user.type === "gestor" && (
                <>
                  <ListItem button onClick={() => handleMenuClick(2)}>
                    <ListItemIcon>
                      <MedicalServicesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Especialidade" />
                  </ListItem>
                  <ListItem button onClick={() => handleMenuClick(3)}>
                    <ListItemIcon>
                      <AssignmentIndIcon />
                    </ListItemIcon>
                    <ListItemText primary="Médico" />
                  </ListItem>
                </>
              )}
            </div>
          </List>
          <Divider />
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {props.state.loading && <LinearProgress />}
          <Grid sx={{ mx: 6, my: 4 }}>
            <Grid container spacing={0}>
              {renderContent(menuRender).header}
            </Grid>
            <Grid>
              <hr />
            </Grid>

            {renderContent(menuRender).component}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
