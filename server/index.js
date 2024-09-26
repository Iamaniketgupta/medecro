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

    // Set up Socket.IO connection
    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      // Handle events and communication with the client
      socket.on("message", (data) => {
        console.log("Message received:", data);
        // Broadcast the message to all clients
        socket.broadcast.emit("message", data);
      });


      // Broadcast when a user joins
      socket.broadcast.emit('user-joined', socket.id);

      // Handle incoming offer from a client
      socket.on('offer', ({ offer, targetId }) => {
        io.to(targetId).emit('offer', { offer, from: socket.id });
      });

      // Handle incoming answer from a client
      socket.on('answer', ({ answer, targetId }) => {
        io.to(targetId).emit('answer', { answer, from: socket.id });
      });

      // Handle ICE candidates
      socket.on('ice-candidate', ({ candidate, targetId }) => {
        io.to(targetId).emit('ice-candidate', { candidate, from: socket.id });
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
