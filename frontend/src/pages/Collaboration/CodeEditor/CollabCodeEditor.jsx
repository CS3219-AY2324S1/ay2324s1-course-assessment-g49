import { useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { YjsContext } from "./CodeEditorLanding";
import { CodeContext } from "../../../utils/CodeContextUtil";

export default function CollabCodeEditor({ language }) {
  const editorRef = useRef(null);
  const { provider, doc } = useContext(YjsContext);
  const { code, handleChangeCode } = useContext(CodeContext);

  function handleEditorChange(value) {
    // onChange("code", value);
    handleChangeCode(value);
  }

  // const roomName = "test-room";
  // const signalingRef = database.ref(`signaling/${roomName}`);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const doc = new Y.Doc();

    const SIGNALING_SERVER = "ws://peerprep-399116.as.r.appspot.com";

    //@ts-ignore
    const provider = new WebrtcProvider("test-room", doc, {
      signaling: [SIGNALING_SERVER],
    });

    console.log("provider:", provider);
    const type = doc.getText("monaco");
    const awareness = provider.awareness;

    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  }

  return (
    <Editor
      height="50vh"
      width="50vh"
      theme="vs-dark"
      language={language || "python"}
      defaultLanguage="python"
      value={code}
      defaultValue="Type your code here"
      onMount={handleEditorDidMount}
      options={{
        cursorBlinking: "blink",
      }}
      onChange={handleEditorChange}
    />
  );
}
