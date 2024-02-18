const AbstractManager = require("./AbstractManager");

class ProfilesManager extends AbstractManager {
  constructor() {
    super({ table: "profiles" });
  }

  // C
  async create({ userId, username }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, username) VALUES (?,?)`,
      [userId, username]
    );
    return result.insertId;
  }

  // R
  async read(userId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // U
  async update({
    username,
    firstName,
    lastName,
    address,
    city,
    phoneNumber,
    id,
  }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET username=?, first_name=?, last_name=?, address=?, city=?, phone_number=? WHERE id=?`,
      [username, firstName, lastName, address, city, phoneNumber, id]
    );
    return [rows];
  }

  // D
  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return [rows];
  }
}

module.exports = ProfilesManager;
