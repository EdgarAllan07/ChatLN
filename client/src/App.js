import "./index.scss";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import Conversations from "./Conversations";
import Operations from "./Operations";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div>

      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <select onChange={(event) => {
            setRoom(event.target.value);
          }} id="room">
            <option disabled selected>Room ID...</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <div className="app-container">
          <Conversations socket={socket} />
          <Chat socket={socket} username={username} room={room} Style="height: 80%" />
          {/* <Operations /> */}
        </div>
      )
      }
    </div >
  );
}

export default App;
