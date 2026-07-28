import nodemailer from "nodemailer";

const EMAIL_ENABLED =
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS;

const transporter = EMAIL_ENABLED
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

const FROM_EMAIL = process.env.SMTP_FROM || process.env.SMTP_USER;

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!transporter || !to) return;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Error enviando email:", error.message);
  }
};

export const sendClubRegisteredEmail = async ({ clubName, to }) => {
  const subject = "Registro exitoso - Torneo Chanarito";
  const text = `Hola ${clubName}, tu club fue registrado correctamente en Torneo Chanarito.`;
  const html = `<p>Hola <strong>${clubName}</strong>,</p><p>Tu club fue registrado correctamente en <strong>Torneo Chanarito</strong>.</p>`;
  await sendEmail({ to, subject, text, html });
};

export const sendAdminCategoryDeletedEmail = async ({
  adminEmail,
  clubName,
  categoryYear,
  deletedByAdmin,
}) => {
  if (!adminEmail) return;

  const actor = deletedByAdmin ? "por un administrador" : "por el club";
  const subject = "Notificacion de eliminacion de categoria";
  const text = `El club ${clubName} elimino la categoria ${categoryYear} (${actor}).`;
  const html = `<p>El club <strong>${clubName}</strong> elimino la categoria <strong>${categoryYear}</strong> (${actor}).</p>`;
  await sendEmail({ to: adminEmail, subject, text, html });
};

export const sendRegistrationSummaryEmail = async ({
  to,
  clubName,
  categories,
}) => {
  const subject = "Resumen de categorias inscriptas";
  const list = categories.join(", ");
  const text = `Hola ${clubName}, tus categorias actualmente inscriptas son: ${list}.`;
  const html = `<p>Hola <strong>${clubName}</strong>,</p><p>Tus categorias actualmente inscriptas son:</p><ul>${categories
    .map((cat) => `<li>${cat}</li>`)
    .join("")}</ul>`;
  await sendEmail({ to, subject, text, html });
};
