const AbstractManager = require("./AbstractManager");

class UserRolesManager extends AbstractManager {
  constructor() {
    super({ table: "user_roles" });
  }

  // C
  async createUserRoles({ userId, roleId }) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, role_id) VALUES (?,?)`,
      [userId, roleId]
    );

    return rows.insertId;
  }

  // R
  async readUserRoles(userId) {
    const [rows] = await this.database.query(
      `SELECT role_id FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
    return rows[0];
  }

  async readAllUserRoles() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} ORDER BY user_id ASC`
    );
    return rows;
  }

  // U
  async updateUserRoles({ newRoleId, roleId, userId }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET role_id=? WHERE user_id=? AND role_id=?`,
      [newRoleId, userId, roleId]
    );
    return [rows];
  }

  // D
  async deleteUserRoles({ userId, roleId }) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND role_id = ?`,
      [userId, roleId]
    );
    return [rows];
  }
}

module.exports = UserRolesManager;
