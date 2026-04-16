import { pool } from "../db/connection.js";

export const createRegistration = async (req, res) => {
  try {
    const { category_id } = req.body;

    //el club viene del token
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
    res.status(500).json({ message: "Error al registrar" });
  }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const club_id = req.user.id;

    const result = await pool.query(
      `SELECT r.id, c.year
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
