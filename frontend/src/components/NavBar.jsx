import { useState, useEffect } from "react";
import { AppBar, Toolbar, Tabs, Tab, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [page, setPage] = useState(0);
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
    localStorage.removeItem("user");
    //localStorage.setItem('user', JSON.stringify({username: null, id: null }));
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
