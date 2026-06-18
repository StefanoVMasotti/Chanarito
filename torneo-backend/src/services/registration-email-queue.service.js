import pool from "../db/connection.js";
import { sendRegistrationSummaryEmail } from "./email.service.js";

const registrationTimers = new Map();
const DEFAULT_DELAY_MIN = 15;
const delayMin = Number(process.env.REGISTRATION_SUMMARY_DELAY_MIN || DEFAULT_DELAY_MIN);

const buildAndSendSummary = async (clubId) => {
  try {
    const clubResult = await pool.query(
      "SELECT id, name, email FROM clubs WHERE id = $1",
      [clubId],
    );
    if (clubResult.rows.length === 0) return;

    const club = clubResult.rows[0];
    const categoriesResult = await pool.query(
      `SELECT c.year
       FROM registrations r
       JOIN categories c ON r.category_id = c.id
       WHERE r.club_id = $1
       ORDER BY c.year`,
      [clubId],
    );

    if (categoriesResult.rows.length === 0) return;

    const categories = categoriesResult.rows.map((row) => `Categoria ${row.year}`);

    await sendRegistrationSummaryEmail({
      to: club.email,
      clubName: club.name,
      categories,
    });
  } catch (error) {
    console.error("Error enviando resumen agrupado:", error.message);
  }
};

export const scheduleRegistrationSummary = (clubId) => {
  if (!clubId) return;

  const existing = registrationTimers.get(clubId);
  if (existing) clearTimeout(existing);

  const timeout = setTimeout(async () => {
    registrationTimers.delete(clubId);
    await buildAndSendSummary(clubId);
  }, delayMin * 60 * 1000);

  registrationTimers.set(clubId, timeout);
};
