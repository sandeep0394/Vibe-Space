import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";  // Ensure this matches your backend

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("🟢 Connected to WebSocket server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("🔴 Disconnected from WebSocket server");
});

export default socket;
