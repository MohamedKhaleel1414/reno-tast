import * as React from "react";
import { styled } from "@mui/material/styles";
import DataTable from "react-data-table-component";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import LockIcon from "@mui/icons-material/Lock";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFormik } from "formik";
import * as yup from "yup";

const tableData = [
  {
    id: 1,
    fullName: "Mohamed Khaleel",
    userName: "Kholio",
    email: "kholio@gmail.com",
    group: "Group1",
    profile: "Profile1",
    status: "Active",
    createdAt:
      String(new Date().getDate()).padStart(2, "0") +
      "/" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "/" +
      new Date().getFullYear(),
  },
  {
    id: 2,
    fullName: "Mohamed Ali",
    userName: "AliBek",
    email: "ali@gmail.com",
    group: "Group1",
    profile: "Profile1",
    status: "Active",
    createdAt:
      String(new Date().getDate()).padStart(2, "0") +
      "/" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "/" +
      new Date().getFullYear(),
  },
  {
    id: 3,
    fullName: "Ahmed Khaled",
    userName: "Khaled1414",
    email: "khaled14@gmail.com",
    group: "Group2",
    profile: "Profile2",
    status: "Active",
    createdAt:
      String(new Date().getDate()).padStart(2, "0") +
      "/" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "/" +
      new Date().getFullYear(),
  },
];

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MainScreen() {
  const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [dataInTable, setDataInTable] = React.useState(tableData);

  const handleDrawer = () => {
    if (open) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addUserFormik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      group: "",
      profile: "",
    },
    validationSchema: yup.object().shape({
      fullName: yup.string().required("You must enter your full name"),
      userName: yup.string().required("You must enter your user name"),
      email: yup
        .string()
        .required("You must enter your email.")
        .email("You must enter valid email."),
      group: yup.string().required("You must enter your group"),
      profile: yup.string().required("You must enter your profile"),
    }),
    onSubmit: (values) => {
      setDataInTable((prevData) => [...prevData, {
        id: prevData.length + 1,
        fullName: values.fullName,
        userName: values.userName,
        email: values.email,
        group: values.group,
        profile: values.profile,
        status: "Active",
        createdAt:
          String(new Date().getDate()).padStart(2, "0") +
          "/" +
          String(new Date().getMonth() + 1).padStart(2, "0") +
          "/" +
          new Date().getFullYear(), 
      }])  
      values.fullName = ""
      values.email = ""
      values.group = ""
      values.profile = ""
      values.userName = "" 
    },
  });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const columns = () => {
    return [
      {
        name: "#",
        selector: (row) => row?.id,
        cell: (row) => (
          <div className="py-4">
            <Checkbox
              checked={selected.includes(row?.id)}
              onChange={() => {
                if (!selected.includes(row?.id)) {
                  setSelected((prevSelected) => [...prevSelected, row?.id]);
                } else {
                  const wantedIdx = selected.indexOf(row?.id);
                  if (wantedIdx > -1) {
                    setSelected((prevSelected) =>
                      prevSelected.filter((id) => id !== row?.id)
                    );
                  }
                }
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        ),
        sortable: false,
        width: "75px",
      },
      {
        name: "Name",
        selector: (row) => row?.fullName,
        cell: (row) => <div className="py-4">{row?.fullName}</div>,
        sortable: true,
      },
      {
        name: "User Name",
        selector: (row) => row?.userName,
        cell: (row) => <div className="py-4">{row?.userName}</div>,
        sortable: true,
      },
      {
        name: "Email Address",
        selector: (row) => row?.email,
        cell: (row) => <div className="py-4">{row?.email}</div>,
        sortable: true,
      },
      {
        name: "Group",
        selector: (row) => row?.group,
        cell: (row) => <div className="py-4">{row?.group}</div>,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row?.status,
        cell: (row) => <div className="py-4">{row?.status}</div>,
        sortable: false,
      },
      {
        name: "Created At",
        selector: (row) => row?.createdAt,
        cell: (row) => <div className="py-4">{row?.createdAt}</div>,
        sortable: true,
      },
    ];
  };

  const resCols = columns();

  const handleRemove = () => {
    const newRes = dataInTable.filter(item => !selected.includes(item.id));
    setDataInTable(newRes);
    setSelected([]);
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafb", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-white">
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              // open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <p className="nav-text-size fw-semibold m-0 text-dark">
              Good Morning!{" "}
              <span className="text-secondary fw-normal">
                Tue 24 Sep 2024 10:30 PM
              </span>{" "}
            </p>
            <div className="d-flex justify-content-end gap-3 text-dark align-items-center">
              <IconButton>
                <HelpOutlineIcon sx={{ color: "gray" }} />
              </IconButton>
              <IconButton>
                <NotificationsIcon sx={{ color: "gray" }} />
              </IconButton>
              <Divider
                orientation="vertical"
                sx={{ color: "gray", p: 0, m: 0 }}
                variant="middle"
                flexItem
              />
              <p className="nav-text-size fw-semibold m-0 text-dark">
                Nader Amer
              </p>
              <div className="rounded-5 px-1 profile">NA</div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: "#050e2d" }}>
          <img src="/reno-logo.png" className="w-100" alt="logo" />
        </DrawerHeader>
        {/* <Divider /> */}
        <List
          sx={{
            backgroundColor: "#050e2d",
            height: "100%",
            color: "gray",
            px: 2,
          }}
        >
          <div className="position-relative d-flex align-items-center mb-3">
            <div className="position-absolute" style={{ right: "6%" }}>
              <SearchIcon />
            </div>
            <input
              type="text"
              className="w-100 rounded-5 px-2"
              placeholder="Quick Access"
            />
          </div>
          <div className="d-flex gap-3 align-items-center mb-5 text-secondary">
            <DashboardIcon />
            <p className="m-0">Dashboard</p>
          </div>
          <div className="mb-2">
            <p className="m-0 opacity-50 fw-semibold" style={{ fontSize: 16 }}>
              SETTINGS
            </p>
          </div>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ p: 0 }}>
              <ListItemText>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  sx={{
                    bgcolor: `${expanded === "panel1" ? "#22a565" : "#050e2d"}`,
                    color: `${expanded === "panel1" ? "white" : "gray"}`,
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: `${expanded === "panel1" ? "white" : "gray"}`,
                        }}
                      />
                    }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>ATM Setting</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0, bgcolor: "#1e2642" }}>
                    <div
                      className={`w-100 px-4 py-3 ${
                        selectedTab === "atm"
                          ? "border-start border-start-1 border-success"
                          : ""
                      }`}
                      style={{
                        color: `${selectedTab === "atm" ? "#22a565" : "white"}`,
                        fontSize: 14,
                      }}
                      onClick={() => {
                        setSelectedTab("atm");
                      }}
                    >
                      ATM Settings
                    </div>
                  </AccordionDetails>
                </Accordion>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ p: 0 }}>
              <ListItemText>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                  sx={{
                    bgcolor: `${expanded === "panel2" ? "#22a565" : "#050e2d"}`,
                    color: `${expanded === "panel2" ? "white" : "gray"}`,
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: `${expanded === "panel2" ? "white" : "gray"}`,
                        }}
                      />
                    }
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <Typography>Business Setup</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0, bgcolor: "#1e2642" }}>
                    <div
                      className={`w-100 px-4 py-3 ${
                        selectedTab === "setup"
                          ? "border-start border-start-1 border-success"
                          : ""
                      }`}
                      style={{
                        color: `${
                          selectedTab === "setup" ? "#22a565" : "white"
                        }`,
                        fontSize: 14,
                      }}
                      onClick={() => {
                        setSelectedTab("setup");
                      }}
                    >
                      Business Setup
                    </div>
                  </AccordionDetails>
                </Accordion>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ p: 0 }}>
              <ListItemText>
                {/* User Management */}
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                  sx={{
                    bgcolor: `${expanded === "panel3" ? "#22a565" : "#050e2d"}`,
                    color: `${expanded === "panel3" ? "white" : "gray"}`,
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: `${expanded === "panel3" ? "white" : "gray"}`,
                        }}
                      />
                    }
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography>User Management</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0, bgcolor: "#1e2642" }}>
                    <div
                      className={`w-100 px-4 py-3 ${
                        selectedTab === "users"
                          ? "border-start border-start-1 border-success"
                          : ""
                      }`}
                      style={{
                        color: `${
                          selectedTab === "users" ? "#22a565" : "white"
                        }`,
                        fontSize: 14,
                      }}
                      onClick={() => {
                        setSelectedTab("users");
                      }}
                    >
                      Users
                    </div>
                  </AccordionDetails>
                  <AccordionDetails sx={{ p: 0, bgcolor: "#1e2642" }}>
                    <div
                      className={`w-100 px-4 py-3 ${
                        selectedTab === "profiles"
                          ? "border-start border-start-1 border-success"
                          : ""
                      }`}
                      style={{
                        color: `${
                          selectedTab === "profiles" ? "#22a565" : "white"
                        }`,
                        fontSize: 14,
                      }}
                      onClick={() => {
                        setSelectedTab("profiles");
                      }}
                    >
                      Profiles
                    </div>
                  </AccordionDetails>
                  <AccordionDetails sx={{ p: 0, bgcolor: "#1e2642" }}>
                    <div
                      className={`w-100 px-4 py-3 ${
                        selectedTab === "groups"
                          ? "border-start border-start-1 border-success"
                          : ""
                      }`}
                      style={{
                        color: `${
                          selectedTab === "groups" ? "#22a565" : "white"
                        }`,
                        fontSize: 14,
                      }}
                      onClick={() => {
                        setSelectedTab("groups");
                      }}
                    >
                      Groups
                    </div>
                  </AccordionDetails>
                </Accordion>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton>
              <ListItemText>License Management</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div className="w-100 p-2 d-flex justify-content-between align-items-center mb-3">
          <p className="m-0 fs-5 fw-semibold">User Management</p>
          <Button
            variant="contained"
            color="success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            sx={{ textTransform: "none" }}
          >
            + Add New
          </Button>
        </div>
        <div className="bg-white w-100 p-3 rounded-2 border border-1">
          <div className="d-flex gap-2 mb-4">
            <TextField
              label={
                <div className="d-flex gap-1">
                  <SearchIcon />
                  <p className="m-0">Search...</p>
                </div>
              }
              size="small"
              className="w-25"
            />
            <TextField label="User name" size="small" sx={{ width: "13%" }} />
            <FormControl sx={{ width: "13%" }}>
              <InputLabel id="demo-simple-select-label" size="small">
                User Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="User Status"
                onChange={handleChangeStatus}
                size="small"
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inactive"}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span className="text-secondary me-2" style={{ fontSize: 14 }}>
              {selected.length} selected
            </span>
            <Divider
              orientation="vertical"
              sx={{ color: "gray", p: 0, m: 0 }}
              variant="middle"
              flexItem
            />
            <Button
              variant="contained"
              color="inherit"
              size="small"
              className="px-0 ms-2"
              sx={{ height: 30, width: 30, minWidth: 0 }}
            >
              <EditIcon sx={{ fontSize: 20 }} />
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              className="px-0"
              sx={{ height: 30, width: 30, minWidth: 0 }}
            >
              <LockIcon sx={{ fontSize: 20 }} />
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              className="d-flex gap-1 align-items-center"
              sx={{ textTransform: "none" }}
              onClick={handleRemove}
            >
              <BlockIcon sx={{ fontSize: 20 }} />
              <p className="m-0">Remove</p>
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Assign to profile
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Assign to group
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              className="px-0"
              sx={{ height: 30, width: 30, minWidth: 0 }}
            >
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </Button>
          </div>
          <div className="mt-4">
            <DataTable
              data={dataInTable}
              columns={resCols}
              defaultSortField="id"
              defaultSortAsc={false}
              pagination={true}
              noDataComponent={
                <h3
                  className="py-5 text-center w-100"
                  style={{ color: "grey", height: "100%", margin: 0 }}
                >
                  There is no data to show
                </h3>
              }
            />
          </div>
        </div>
      </Main>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New User
              </h1>
              <IconButton data-bs-dismiss="modal" aria-label="Close">
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </div>
            <form className="pt-2" onSubmit={addUserFormik.handleSubmit}>
              <div className="modal-body">
                <div className="mb-2 px-2">
                  <label
                    htmlFor="fullName"
                    className="form-label fw-semibold"
                    style={{ fontSize: 14 }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={addUserFormik.handleChange}
                    onBlur={addUserFormik.handleBlur}
                    value={addUserFormik.values.fullName}
                    id="fullName"
                    aria-describedby="emailHelp"
                    name="fullName"
                    placeholder="Enter full name"
                  />
                  {addUserFormik.touched.fullName && (
                    <div className="bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10">
                      {addUserFormik.errors.fullName}
                    </div>
                  )}
                </div>
                <div className="mb-2 px-2">
                  <label
                    htmlFor="userName"
                    className="form-label fw-semibold"
                    style={{ fontSize: 14 }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={addUserFormik.handleChange}
                    onBlur={addUserFormik.handleBlur}
                    value={addUserFormik.values.userName}
                    id="userName"
                    aria-describedby="emailHelp"
                    name="userName"
                    placeholder="Enter user name"
                  />
                  {addUserFormik.touched.userName && (
                    <div className="bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10">
                      {addUserFormik.errors.userName}
                    </div>
                  )}
                </div>
                <div className="mb-2 px-2">
                  <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                    style={{ fontSize: 14 }}
                  >
                    Full Name
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={addUserFormik.handleChange}
                    onBlur={addUserFormik.handleBlur}
                    value={addUserFormik.values.email}
                    id="email"
                    aria-describedby="emailHelp"
                    name="email"
                    placeholder="Enter email"
                  />
                  {addUserFormik.touched.email && (
                    <div className="bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10">
                      {addUserFormik.errors.email}
                    </div>
                  )}
                </div>
                <div className="input-group px-2 mb-2 d-flex flex-column">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: 14 }}
                  >
                    User Group
                  </label>
                  <select
                    className="form-select w-100"
                    id="inputGroupSelect04"
                    aria-label="Example select with button addon"
                    onChange={addUserFormik.handleChange}
                    onBlur={addUserFormik.handleBlur}
                    value={addUserFormik.values.group}
                    name="group"
                  >
                    <option value="" label="Choose user group" />
                    <option value="Group1" label="Group1" />
                    <option value="Group2" label="Group2" />
                  </select>
                  {addUserFormik.touched.group && (
                    <div className="bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10">
                      {addUserFormik.errors.group}
                    </div>
                  )}
                </div>
                <div className="input-group px-2 mb-2 d-flex flex-column">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: 14 }}
                  >
                    Assign profile
                  </label>
                  <select
                    className="form-select w-100"
                    id="inputGroupSelect04"
                    aria-label="Example select with button addon"
                    onChange={addUserFormik.handleChange}
                    onBlur={addUserFormik.handleBlur}
                    value={addUserFormik.values.profile}
                    name="profile"
                  >
                    <option value="" label="Choose user group" />
                    <option value="Profile1" label="Profile1" />
                    <option value="Profile2" label="Profile2" />
                  </select>
                  {addUserFormik.touched.profile && (
                    <div className="bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10">
                      {addUserFormik.errors.profile}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary text-black"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success" data-bs-dismiss="modal" disabled={!addUserFormik.isValid && addUserFormik.touched}>
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
}
