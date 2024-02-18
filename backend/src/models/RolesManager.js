const AbstractManager = require("./AbstractManager");

class RolesManager extends AbstractManager {
  constructor() {
    super({ table: "roles" });
  }

  // C
  async create({ roleName }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (role_name) VALUES (?)`,
      [roleName]
    );
    return result.insertId;
  }

  // R
  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // U
  async update({ roleName, id }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET role_name=? WHERE id=?`,
      [roleName, id]
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

module.exports = RolesManager;
