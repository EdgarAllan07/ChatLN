import "./index.scss";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import Conversations from "./Conversations";
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io.connect("http://localhost:3001");
export var nombre, rm;
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
    nombre = username;
    rm = room;
  };

  return (
    <div className="d-flex justify-content-center align-items-center">

      {!showChat ? (
        <div >
          <div className="d-flex justify-content-center align-items-center">
            <h3 className="text-white">Join a chat</h3>

          </div>
          <div>
            <input
              type="text"
              placeholder="Type your username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div>
            <select className="form-select form-select-sm mt-3" aria-label=".form-select-sm example" onChange={(event) => {
              setRoom(event.target.value);
            }} id="room">
              <option disabled selected>Select Room</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <div className="d-flex justify-content-center align-items-center">

            <button onClick={joinRoom} type="button" className="btn btn-light mt-3 ml-3 ">Join A Room</button>
          </div>
        </div>
      ) : (
        <div className="app-container">
          <Conversations socket={socket} username={username}  room={room} />
          <Chat socket={socket} username={username} room={room} Style="height: 80%" />
          {/* <Operations /> */}
        </div>
      )
      }
    </div >
  );
}

export default App;
