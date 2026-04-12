import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = 3000;

// Middleware obligatorios
app.use(cors()); // Permite que React se conecte
app.use(express.json()); // Permite recibir datos en formato JSON

// Rutas de tareas
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
