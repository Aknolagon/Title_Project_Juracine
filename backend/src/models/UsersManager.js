const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // C
  async create({
    email,
    hashedPassword,
    createdDate = new Date(),
    lastConnexion = new Date(),
  }) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (email, hashed_password, created_date, last_connexion) VALUES (?,?,?,?)`,
      [email, hashedPassword, createdDate, lastConnexion]
    );
    return rows.insertId;
  }

  // R
  async read(userId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
    return rows[0];
  }

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // U
  async update({ email, hashedPassword, lastConnexion, userId }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET email=?, hashed_password=?, last_connexion=? WHERE user_id=?`,
      [email, hashedPassword, lastConnexion, userId]
    );
    return [rows];
  }

  // D
  async delete(userId) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
    return [rows];
  }
}

module.exports = UsersManager;
