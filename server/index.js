const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Estructura de datos para almacenar los usuarios conectados por sala
const connectedUsers = {};

// Función para obtener la lista de usuarios en una sala
function getUsersInRoom(room) {
  // Verificar si la sala existe en la estructura de datos
  if (connectedUsers.hasOwnProperty(room)) {
    return connectedUsers[room];
  }
  return [];
}

// Función para obtener la sala de un usuario
function getRoomOfUser(userId) {
  for (const room in connectedUsers) {
    if (connectedUsers[room].find(user => user.id === userId)) {
      return room;
    }
  }
  return null;
}

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    const room = data.room;
    const username = data.username;
  
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  
    // Agregar el usuario a la lista de usuarios conectados en la sala
    if (!connectedUsers.hasOwnProperty(room)) {
      connectedUsers[room] = [];
    }
    connectedUsers[room].push({ id: socket.id, username });
  
    // Obtener la lista de usuarios en la sala y emitirla al cliente
    const userList = getUsersInRoom(room);
    io.to(room).emit("user_list", userList);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);

    // Eliminar al usuario de la lista de usuarios conectados en la sala
    const room = getRoomOfUser(socket.id);
    if (room && connectedUsers.hasOwnProperty(room)) {
      connectedUsers[room] = connectedUsers[room].filter(user => user.id !== socket.id);

      // Actualizar la lista de usuarios en la sala y emitirla a los clientes en la sala
      const userList = getUsersInRoom(room);
      io.to(room).emit("user_list", userList);
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
