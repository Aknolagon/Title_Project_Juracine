const argon2 = require("argon2");
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
      `SELECT id, email FROM ${this.table} WHERE id = ?`,
      [userId]
    );
    return rows[0];
  }

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `SELECT ${this.table}.*, profiles.username, user_roles.role_id FROM ${this.table} LEFT JOIN profiles ON users.id = profiles.user_id LEFT JOIN user_roles ON users.id = user_roles.user_id WHERE email = ?`,
      [email]
    );
    const userIsAdmin = rows.some((role) => role.role_id === 2);
    rows[0].isAdmin = userIsAdmin;
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT id, email FROM ${this.table}`
    );
    return rows;
  }

  // U
  async update({ email, password, lastConnexion = new Date(), id }) {
    const hashedPassword = await argon2.hash(password);
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET email=?, hashed_password=?, last_connexion=? WHERE id=?`,
      [email, hashedPassword, lastConnexion, id]
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
