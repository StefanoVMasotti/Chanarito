import { pool } from "../db/connection.js";
import bcrypt from "bcrypt";

export const createClub = async (req, res) => {
  try {
    const { name, coordinator_name, email, password, phone } = req.body;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO clubs (name, coordinator_name, email, password, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, coordinator_name, email, hashedPassword, phone],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    // Manejo de error específico para clave única (email)
    if (error.code === "23505") {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    res.status(500).json({ message: "Error creando el club" });
  }
};

export const getClubs = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, coordinator_name, email, phone, role, created_at FROM clubs",
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo clubes" });
  }
};

export const getClubById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, name, coordinator_name, email, phone, role, created_at
       FROM clubs
       WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Club no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo el club" });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, coordinator_name, email, phone } = req.body;

    const result = await pool.query(
      `UPDATE clubs
       SET name = $1,
           coordinator_name = $2,
           email = $3,
           phone = $4
       WHERE id = $5
       RETURNING id, name, coordinator_name, email, phone, role, created_at`,
      [name, coordinator_name, email, phone, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Club no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    res.status(500).json({ message: "Error actualizando el club" });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM clubs WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Club no encontrado" });
    }

    res.json({ message: "Club eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando el club" });
  }
};
