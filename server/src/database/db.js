import mysql from "mysql2/promise";

let connection;
const connectDB = async () => {
  try {
    connection = await mysql.createConnection(process.env.MYSQL_PUBLIC_URL);
    if (connection) {
      console.log("Connected to DB!");
    }
  } catch (error) {
    console.log("Error connecting to DB: ", error);
  }
};

const disconnectDB = async () => {
  await connection.end();
  console.log("Disconnected from DB!");
};

export { connectDB, connection, disconnectDB };
