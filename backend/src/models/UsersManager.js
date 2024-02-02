const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // C
  async create({
    email,
    hashedPassword,
    confirmationInscription,
    createdDate,
    lastConnection = new Date(),
  }) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (email, hashed_password, confirmation_inscription, created_date, last_connection) VALUES (?,?,?,?,?)`,
      [
        email,
        hashedPassword,
        confirmationInscription,
        new Date(createdDate),
        lastConnection,
      ]
    );
    return rows.insertId;
  }

  // R
  async read(userId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [userId]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }

  // U
  async update({
    email,
    hashedPassword,
    confirmationInscription,
    createdDate,
    lastConnection = new Date(),
    userId,
  }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET email=?, hashed_password=?, confirmation_inscription=?, created_date=?, last_connection=? WHERE id=?`,
      [
        email,
        hashedPassword,
        confirmationInscription,
        new Date(createdDate),
        lastConnection,
        userId,
      ]
    );
    return [rows];
  }

  // D
  async delete(userId) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [userId]
    );
    return [rows];
  }
}

module.exports = UsersManager;
