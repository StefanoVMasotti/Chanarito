import "dotenv/config";
import pool from "../db/connection.js";
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

    const token = jwt.sign(
      {
        id: club.id,
        email: club.email,
        role: club.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    //Envio el token y los datos del club (sin la contraseña)
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

export const register = async (req, res) => {
  try {
    const { name, coordinator_name, email, password } = req.body;

    if (!name || !coordinator_name || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    //encripto password
    const hashedPassword = await bcrypt.hash(password, 10);

    //guardar
    const result = await pool.query(
      `INSERT INTO clubs (name, coordinator_name, email, password, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, coordinator_name, email, role`,
      [name, coordinator_name, email, hashedPassword, "club"],
    );

    res.json({
      message: "Club registrado correctamente",
      club: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    //email duplicado
    if (error.code === "23505") {
      return res.status(400).json({
        message: "El email ya está registrado",
      });
    }

    console.log(req.body);

    res.status(500).json({
      message: "Error en el registro",
    });
  }
};
