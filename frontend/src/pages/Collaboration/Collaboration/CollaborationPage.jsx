import { Grid, Paper } from "@mui/material/";
import Communication from "../../../components/Collaboration/Communication/Communication";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: "3%",
  flex: 1,
  margin: "0.5vh",
}));

function CollaborationPage() {
  return (
    <Grid container direction="row">
      <Grid container item xs={8} sx={{ height: "100vh" }}>
        <Item elevation={3}>Code Editor</Item>
      </Grid>
      <Grid container item direction="column" xs={4} sx={{ height: "100vh" }}>
        <Item elevation={3}>Question Description</Item>
        <Item elevation={3}>{<Communication />}</Item>
      </Grid>
    </Grid>
  );
}

export default CollaborationPage;
