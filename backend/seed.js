require("dotenv").config();

const database = require("./database/client");

const seed = async () => {
  try {
    const queries = [];

    await database.query("delete from users");
    queries.push(
      database.query(
        "insert into users (email, hashed_password, created_date, last_connexion) values ('kalki@gmail.com', 'yoyo', '2024-01-01 00:00:00', '2024-01-01 00:00:00')"
      )
    );
    queries.push(
      database.query(
        "insert into users (email, hashed_password, created_date, last_connexion) values ('naruto@gmail.com', 'popo', '2024-01-01 00:00:00', '2024-01-01 00:00:00')"
      )
    );

    await database.query("delete from profiles");
    queries.push(
      database.query(
        "insert into profiles (user_id, username, first_name, last_name, address, city, phone_number) values ('1', 'Muchacho', 'lorem', 'ipsum', '33 Wild Code Place 13000', 'Marseille', '05.56.56.56.56')"
      )
    );
    queries.push(
      database.query(
        "insert into profiles (user_id, username, first_name, last_name, address, city, phone_number) values ('2', 'Uzumaki', 'lolo', 'ipsum', '33 Wild Code Place 13000', 'Marseille', '05.56.56.56.56')"
      )
    );

    await database.query("delete from roles");
    queries.push(
      database.query(
        "insert into roles (role_name) values ('Member'), ('Admin'), ('Fan')"
      )
    );

    await database.query("delete from user_roles");
    queries.push(
      database.query(
        "insert into user_roles (user_id, role_id) values ('1', '2')"
      )
    );
    queries.push(
      database.query(
        "insert into user_roles (user_id, role_id) values ('1', '1')"
      )
    );
    queries.push(
      database.query(
        "insert into user_roles (user_id, role_id) values ('2', '1')"
      )
    );

    await Promise.all(queries);
    database.end();
    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

seed();
