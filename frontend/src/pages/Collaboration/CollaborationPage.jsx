import { Grid, Paper } from "@mui/material/";
import { styled } from "@mui/material/styles";
import LanguageContextUtil from "../../utils/LanguageContextUtil";
import CodeEditorLanding from "./CodeEditor/CodeEditorLanding";
import CodeContextUtil from "../../utils/CodeContextUtil";
import Communication from "../../components/Collaboration/Communication";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
import QuestionView from "../../components/Collaboration/QuestionView";

function CollaborationPage() {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    padding: "3%",
    flex: 1,
    margin: "0.5vh",
    height: "100vh",
    overflow: "auto",
  }));
  const location = useLocation();
  const { roomId, sessionId, questionId } = location.state;

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid
        item
        xs={4.5}
        style={{ display: "flex", height: "100vh", width: "100%" }}
      >
        <Item elevation={3}>
          <CodeContextUtil>
            <LanguageContextUtil>
              <CodeEditorLanding roomName={sessionId} questionId={questionId} />
            </LanguageContextUtil>
          </CodeContextUtil>
        </Item>
      </Grid>
      <Grid item xs={3.75} style={{ height: "100vh", width: "100%" }}>
        <Item elevation={3}>{<QuestionView questionId={questionId} />}</Item>
      </Grid>
      <Grid item xs={3.75}>
        <Item elevation={3} style={{ height: "100vh", width: "100%" }}>
          {<Communication meetingRoomId={roomId} />}
        </Item>
      </Grid>
    </Grid>
  );
}

export default CollaborationPage;
