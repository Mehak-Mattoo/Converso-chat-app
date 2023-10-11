const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const bodyParser = require("body-parser");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const User = require("./Models/userModel");
dotenv.config();
connectDB();
const port = process.env.PORT || 4000;

app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));

// app.get("/chats", (req, res) => {
//   res.send(chats);
// });

// app.get("/chats/:id", (req, res) => {
//   res.send(chats);
// });

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// const io = require("socket.io")(server, {
//   pingTimeout: 6000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("connected to io");
//   socket.on("setup", (UserData) => {
//     socket.join(UserData.data._id);
//     // console.log(UserData.data._id);
//     socket.emit("connected");
//     socket.on("join chat", (room) => {
//       socket.join(room);
//       console.log("user joined room" + room);
//     });

//     socket.on("typing", (room) => socket.in(room).emit("typing"));
//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
//     socket.on("new message", (newMsgReceived) => {
//       var chat = newMsgReceived.chat;

//       if (!chat.users) return console.log("chat.users not defined");
//       chat.users.forEach((User) => {
//         if (User._id == newMsgReceived.sender._id) return;

//         socket.in(User._id).emit("message received", newMsgReceived);
//       });
//     });
//   });
// });

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData.data._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room._id);
    console.log("User Joined Room: " + room._id);
  });
  socket.on("typing", (room) => socket.in(room._id).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room._id).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
