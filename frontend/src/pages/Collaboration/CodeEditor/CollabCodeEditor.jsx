import { createContext, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { QuillBinding } from "y-quill";
import TrialCollaborativeButton from "./TrialButton";

export default function CollabCodeEditor({ onChange, language, code }) {
  const editorRef = useRef(null);
  const [value, setValue] = useState(code || "");

  function handleEditorChange(value) {
    setValue(value);
    onChange("code", value);
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const doc = new Y.Doc();
    const provider = new WebrtcProvider("test-room", doc, {
      signaling: ["wss://y-webrtc-eu.fly.dev/"],
    });
    const type = doc.getText("monaco");
    const awareness = provider.awareness;
    /** 
    // Add a custom field for the button click event
    awareness.setLocalStateField("buttonClick", false);

    // Listen for awareness changes
    awareness.on("change", () => {
      // Whenever somebody updates their awareness information,
      // check if the button click event field is true
      const allStates = awareness.getStates();
      const buttonClickEventStates = Array.from(allStates.values()).filter(
        (state) => state["buttonClick"] === true
      );

      if (buttonClickEventStates.length > 0) {
        // Handle the button click event here
        console.log("Button was clicked by:", buttonClickEventStates);

        // Reset the button click event field to false for all users
        awareness.setLocalStateField("buttonClick", false);
      }
    });*/
    /** 
        const awareness = provider.awareness
        awareness.on('change', changes => {
            // Whenever somebody updates their awareness information,
            // we log all awareness information from all users.
            console.log(Array.from(awareness.getStates().values()))
          })
          awareness.setLocalStateField('user', {
            // Define a print name that should be displayed
            name: 'Emmanuelle Charpentier',
            // Define a color that should be associated to the user:
            color: '#ffb61e' // should be a hex color
          })
          */
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  }
  return (
    <Editor
      height="100vh"
      width="50vw"
      theme="vs-dark"
      language={language || "python"}
      defaultLanguage="python"
      value={value}
      defaultValue="// some comment"
      onMount={handleEditorDidMount}
      options={{
        cursorBlinking: "solid",
      }}
      onChange={handleEditorChange}
    />
  );
}
