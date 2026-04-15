import "dotenv/config";
import { pool } from "../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginClub = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busco al club por email
    const result = await pool.query("SELECT * FROM clubs WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const club = result.rows[0];

    // Comparo la contraseña con bcrypt
    const isMatch = await bcrypt.compare(password, club.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Genero el JWT
    const token = jwt.sign(
      {
        id: club.id,
        email: club.email,
        role: club.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    //  Envio el token y los datos del club (sin la contraseña)
    res.json({
      token,
      club: {
        id: club.id,
        name: club.name,
        email: club.email,
        role: club.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en login" });
  }
};
