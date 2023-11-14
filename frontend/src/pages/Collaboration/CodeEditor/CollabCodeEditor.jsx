import React, { useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { YjsContext } from "./CodeEditorLanding";
import { CodeContext } from "../../../utils/CodeContextUtil";
import { WebrtcProvider } from "y-webrtc";

export default function CollabCodeEditor({ language }) {
  const editorRef = useRef(null);
  const { provider, doc } = useContext(YjsContext);
  const { code, handleChangeCode } = useContext(CodeContext);

  function handleEditorChange(value) {
    handleChangeCode(value);
  }

  // const roomName = "test-room";
  // const signalingRef = database.ref(`signaling/${roomName}`);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    const text = doc.getText("monaco");

    handleChangeCode(text.toString());
    const binding = new MonacoBinding(
      text,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <Editor
        height="60vh"
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
    </div>
  );
}
