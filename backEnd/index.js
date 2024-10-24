const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const socketServer = http.createServer();
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const io = new Server(socketServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User${socket.id} connected`);

  socket.on("typing", (data) => {
    socket.to(data.room).emit("typingResponse", {
      username: data.username,
      typing: data.typing,
    });
  });

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user(${socket.id}) data(${data})`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recive_msg", data);
  });

  socket.on("disconnect", () => {
    console.log(`User(${socket.id})disconnected`);
  });
});

const port = 7000;
socketServer.listen(port, () => {
  console.log(`sever listing on  this  ${port}`);
});
