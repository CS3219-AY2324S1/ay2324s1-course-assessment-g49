import  { useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";

export default function CodeEditor() {
  const [code, setCode] = useState("console.log('Code Mirror!');"); // Initialize with an empty code

  const handleChange = (editor, data, value) => {
    // Update the code when the editor content changes
    setCode(value);
  };

  return (
    <div>
      <h1>Code Editor</h1>
      <CodeMirror
      value={code}
      height="100px"
    />
    </div>
  );
}
