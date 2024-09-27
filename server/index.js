import "dotenv/config" ;
import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";
import { createServer } from "http"; // Import to create an HTTP server
import { Server } from "socket.io"; // Import Socket.IO


// Connect to MongoDB
connectDB()
  .then(() => {
    // Create an HTTP server using the Express app
    const server = createServer(app);

    // Initialize Socket.IO
    const io = new Server(server, {
      cors: {
        origin: "*", // Allow all origins (adjust as needed for security)
        methods: ["GET", "POST"],
      },
    });

    const userSocketMap = new Map();

    // Set up Socket.IO connection
    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);
      socket.on("register", ({ userId, role }) => {
        userSocketMap.set(userId, socket.id);
        console.log(
          `User registered: ${role} - ${userId}, Socket ID: ${socket.id}`
        );
      });

      // Handle message from doctor to patient
      socket.on("message", ({ senderId, receiverId, message }) => {
        console.log(
          "Message received from",
          senderId,
          "to",
          receiverId,
          ":",
          message
        );

        const receiverSocketId = userSocketMap.get(receiverId);
        if (receiverSocketId) {
          // Send message to the specific receiver
          io.to(receiverSocketId).emit("message", {
            senderId,
            message,
          });
        } else {
          console.log("Receiver not connected:", receiverId);
        }
      });

      // Handle client disconnect
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    // Start the server
    const port = process.env.PORT || 8000;
    server.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed:", err);
  });
