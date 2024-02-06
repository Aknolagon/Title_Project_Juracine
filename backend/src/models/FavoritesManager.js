const AbstractManager = require("./AbstractManager");

class FavoritesManager extends AbstractManager {
  constructor() {
    super({ table: "favorites" });
  }

  // C
  async create({ dateAdded }) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (date_added) VALUES (?)`,
      [new Date(dateAdded)]
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

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // D
  async delete(favoriteId) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [favoriteId]
    );
    return [rows];
  }
}

module.exports = FavoritesManager;
