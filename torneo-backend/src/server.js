import "dotenv/config";
import app from "./app.js";
import pool from "./db/connection.js";

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa:", res.rows[0]);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
