import { connectDB, disconnectDB } from "./database/db.js";
import app from "./app.js";
const port = process.env.PORT || 3000;
let server;

(async () => {
  try {
    await connectDB();

    server = app.listen(port, () => {
      console.log(`Server is running at the port: ${port}`);
    });

    app.on("error", (error) => {
      console.log("App error: ", error);
      throw error;
    });
  } catch (error) {
    console.log("Error during startup:", error);
  }
})();

const gracefulShutdown = async () => {
  await disconnectDB();
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", gracefulShutdown);

process.on("SIGINT", gracefulShutdown);
