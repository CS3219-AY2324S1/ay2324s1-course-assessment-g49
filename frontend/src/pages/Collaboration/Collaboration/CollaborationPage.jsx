import { Grid } from "@mui/material/";

function CollaborationPage() {
  return (
    <Grid container direction="row">
      <Grid container item spacing={3} xs={8} sx={{ backgroundColor: "brown" }}>
        Code Editor
      </Grid>
      <Grid container item spacing={3} direction="column" xs={4}>
        <Grid item sx={{ backgroundColor: "blue" }}>
          Question Description
        </Grid>
        <Grid item sx={{ backgroundColor: "green" }}>
          Communication Platform
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CollaborationPage;
