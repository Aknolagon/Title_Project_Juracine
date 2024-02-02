const AbstractManager = require("./AbstractManager");

class ProfilesManager extends AbstractManager {
  constructor() {
    super({ table: "profiles" });
  }

  // C
  async create({
    userId,
    userName,
    firstName,
    lastName,
    address,
    city,
    phoneNumber,
  }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, username, first_name, last_name, address, city, phone_number) VALUES (?,?,?,?,?,?,?)`,
      [userId, userName, firstName, lastName, address, city, phoneNumber]
    );
    return result.insertId;
  }

  // async createForReservation({ firstName, lastName }) {
  //   await this.database.query(
  //     `INSERT INTO ${this.table} ( first_name, last_name ) VALUES (?,?)`,
  //     [firstName, lastName]
  //   );
  // }

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
    userName,
    firstName,
    lastName,
    address,
    city,
    phoneNumber,
    profileId,
  }) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET username=?, first_name=?, last_name=?, address=?, city=?, phone_number=? WHERE id=?`,
      [userName, firstName, lastName, address, city, phoneNumber, profileId]
    );
    return [rows];
  }

  // D
  async delete(profileId) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [profileId]
    );
    return [rows];
  }
}

module.exports = ProfilesManager;
