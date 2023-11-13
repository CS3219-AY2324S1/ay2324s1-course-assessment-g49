import { Grid } from "@mui/material/";
import CodeEditor from "./CodeEditor/CodeEditor";
import CollabCodeEditor from "./CodeEditor/CollabCodeEditor";
import CodeEditorLanding from "./CodeEditor/CodeEditorLanding";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import YourButtonComponent from "./CodeEditor/CollaborativeButton";

function CollaborationPage() {
  // Create a Yjs document
  const ydoc = new Y.Doc();
  console.log("ydoc:", ydoc);

  // Define a Yjs data type for your button state
  const buttonState = ydoc.getArray("button-state");

  // Initialize the initial state of the button
  buttonState.push([false]); // You can start with a disabled button

  return (
    <Grid container direction="row">
      <Grid container item spacing={3} xs={8}>
        <CodeEditorLanding />
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
