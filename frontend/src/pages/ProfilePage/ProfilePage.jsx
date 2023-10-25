import { useState } from "react";
import { Grid } from "@mui/material";
import VerticalNavBar from "../../components/VerticalNavBar";
import PastSubmissions from "./PastSubmissions";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import NavBar from "../../components/NavBar";

function ProfilePage() {
  const navigationTabs = ["Past Submissions", "Edit Profile", "Settings"];
  const [selectedTab, setSelectedTab] = useState(navigationTabs[0]);

  const renderPanel = () => {
    switch (selectedTab) {
      case "Past Submissions":
        return <PastSubmissions />;
      case "Edit Profile":
        return <EditProfile />;
      case "Settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <VerticalNavBar
              selectedTab={selectedTab}
              onSelectTab={setSelectedTab}
              navigationTabs={navigationTabs}
            />
          </Grid>
          <Grid item xs={10}>
            {renderPanel()}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
