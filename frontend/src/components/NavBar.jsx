import { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Tabs, Tab, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContextUtil";
import { SnackbarContext } from "../utils/SnackbarContextUtil";

const NavBar = () => {
  const location = useLocation();
  const { setUser } = useAuth();
  const [page, setPage] = useState(0);
  const { snack, setSnack } = useContext(SnackbarContext);
  const pageTabs = [
    {
      page: "Home",
      route: "/home",
    },
    {
      page: "Profile",
      route: "/profile",
    },
    {
      page: "Questions Repo",
      route: "/questions",
    },
  ];

  useEffect(() => {
    const currentPage = pageTabs.findIndex(
      (page) => page.route === location.pathname
    );
    if (currentPage !== -1) {
      setPage(currentPage);
    }
  }, [location]);

  const handleLogOut = (evt) => {
    setSnack({
      message: "Logged out successfully",
      open: true,
      severity: "success",
    });
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "flex-end", alignItems: "center" }}>
          <Tabs
            value={page}
            onChange={(e, value) => setPage(value)}
            textColor="inherit"
          >
            {pageTabs.map((object, index) => (
              <Tab
                key={index}
                label={object.page}
                component={Link}
                to={object.route}
              />
            ))}
          </Tabs>
          <Button
            variant="text"
            href="/"
            onClick={handleLogOut}
            sx={{ color: "inherit" }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default NavBar;
