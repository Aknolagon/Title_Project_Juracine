const AbstractManager = require("./AbstractManager");

class RolesManager extends AbstractManager {
  constructor() {
    super({ table: "roles" });
  }

  // C
  async create({ profileId, roleName }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (profile_id, role_name) VALUES (?,?)`,
      [profileId, roleName]
    );
    return result.insertId;
  }

  // R
  async read(profileId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE profile_id = ?`,
      [profileId]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // U
  async update({ roleName, profileId }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET role_name=? WHERE id=?`,
      [roleName, profileId]
    );
    return [rows];
  }

  // D
  async delete(roleId) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [roleId]
    );
    return [rows];
  }
}

module.exports = RolesManager;
