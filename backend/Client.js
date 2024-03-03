const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'UserDB',
  password: 'Sonu123@',
  port: 5432,
});

client.connect();

async function insertUserData() {
  // Define the number of records you want to generate
  const numberOfRecords = 50;

  const users = await client.query('SELECT * FROM users');
  if (users.rows.length < numberOfRecords) {

    // Loop to generate and insert user data records
    for (let i = 0; i < numberOfRecords; i++) {
      // Generate random values for each field
      const userData = {
        user_name: 'User ' + (i + 1),
        age: Math.floor(Math.random() * 50) + 18,
        phone: Math.random().toString().slice(2, 12),
        location: 'Location ' + (i + 1),
        created_at: new Date(new Date(2020, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())),
      };
      try {
        // Insert data into the users table
        const result = await client.query(
          `INSERT INTO public.users (user_name, age, phone, location, created_at) VALUES ($1, $2, $3, $4, $5)`,
          [userData.user_name, userData.age, userData.phone, userData.location, userData.created_at]
        );
        console.log("Data inserted successfully");
      } catch (err) {
        console.error("Error inserting data:", err.message);
      }
    }
  };

}


insertUserData()


module.exports = client;
