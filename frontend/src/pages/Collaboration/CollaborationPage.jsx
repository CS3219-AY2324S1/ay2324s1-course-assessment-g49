import { Grid, Paper } from "@mui/material/";
import { styled } from "@mui/material/styles";
import LanguageContextUtil from "../../utils/LanguageContextUtil";
import CodeEditorLanding from "./CodeEditor/CodeEditorLanding";
import CodeContextUtil from "../../utils/CodeContextUtil";

function CollaborationPage() {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    padding: "3%",
    flex: 1,
    margin: "0.5vh",
    overflow: "auto",
  }));

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid
        item
        xs={4.5}
        style={{ display: "flex", height: "100vh", width: "100%" }}
      >
        <Item elevation={3}>
          <CodeContextUtil>
            <LanguageContextUtil>
              <CodeEditorLanding />
            </LanguageContextUtil>
          </CodeContextUtil>
        </Item>
      </Grid>
      <Grid item xs={3.75} style={{ height: "100vh", width: "100%" }}>
        <Item elevation={3}>Question Description</Item>
      </Grid>
      <Grid item xs={3.75}>
        <Item elevation={3} style={{ height: "100vh", width: "100%" }}>
          Communication
        </Item>
      </Grid>
    </Grid>
  );
}

export default CollaborationPage;
