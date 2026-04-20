import { pool } from "../db/connection.js";

export const createRegistration = async (req, res) => {
  try {
    const { category_id } = req.body;
    const club_id = req.user.id;

    const result = await pool.query(
      `INSERT INTO registrations (club_id, category_id)
       VALUES ($1, $2)
       RETURNING *`,
      [club_id, category_id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    //error de duplicado (clave única)
    if (error.code === "23505") {
      return res.status(400).json({
        message: "Ya estás inscripto en esta categoría",
      });
    }

    res.status(500).json({ message: "Error al registrar" });
  }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const club_id = req.user.id;

    const result = await pool.query(
      `SELECT r.id, r.category_id, c.year
       FROM registrations r
       JOIN categories c ON r.category_id = c.id
       WHERE r.club_id = $1`,
      [club_id],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener inscripciones" });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const club_id = req.user.id;

    const result = await pool.query(
      `DELETE FROM registrations
       WHERE id = $1 AND club_id = $2
       RETURNING *`,
      [id, club_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Registro no encontrado",
      });
    }

    res.json({ message: "Inscripción eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar" });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.id, clubs.name AS club, c.year, r.created_at
       FROM registrations r
       JOIN clubs ON r.club_id = clubs.id
       JOIN categories c ON r.category_id = c.id
       ORDER BY r.created_at DESC`,
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener registros" });
  }
};

export const deleteAnyRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM registrations
       WHERE id = $1
       RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Registro no encontrado",
      });
    }

    res.json({ message: "Inscripción eliminada por admin" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar" });
  }
};
