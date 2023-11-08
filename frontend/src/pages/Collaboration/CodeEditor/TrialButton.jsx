import { useContext } from "react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

export default function TrialCollaborativeButton(awareness) {
  const handleClick = () => {
    // Set the 'buttonClick' field to true in the awareness object
    awareness.setLocalStateField("buttonClick", true);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me collaboratively!</button>
    </div>
  );
}
