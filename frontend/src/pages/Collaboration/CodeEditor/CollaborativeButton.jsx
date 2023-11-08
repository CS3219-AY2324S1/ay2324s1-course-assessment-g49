import { WebrtcProvider } from "y-webrtc";

export default function YourButtonComponent() {
  const ydoc = new Y.Doc();
  // clients connected to the same room-name share document updates
  //const provider = new WebrtcProvider('test-romm', ydoc, { password: 'optional-room-password' })
  //const provider = new WebrtcProvider("test-room", ydoc);
  const buttonState = ydoc.getArray("button-state");
  //const yarray = ydoc.get('array', Y.Array)
  //const yjs = useWebsocketProvider();
  //const buttonState = yjs.getArray('button-state');

  const handleClick = () => {
    // Toggle the button state
    buttonState.push([!buttonState.get(0)]);
  };

  return (
    <button onClick={handleClick} disabled={!buttonState.get(0)}>
      Collaborative Button
    </button>
  );
}
