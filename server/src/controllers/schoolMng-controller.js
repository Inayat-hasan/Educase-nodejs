import { connection } from "../database/db.js";

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Basic validation
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude must be valid numbers." });
    }

    // Sanitize coordinates
    if (lat <= -90 || lat >= 90) {
      return res
        .status(400)
        .json({ error: "Latitude must be between -90 and 90 degrees." });
    }
    if (lon <= -180 || lon >= 180) {
      return res
        .status(400)
        .json({ error: "Longitude must be between -180 and 180 degrees." });
    }

    await connection.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, lat, lon]
    );

    res.status(201).json({ message: "School added successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Haversine formula to calculate distance between 2 coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radius of Earth in KM
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "User latitude and longitude required." });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({ error: "Invalid coordinates." });
    }

    // Sanitize coordinates
    if (userLat <= -90 || userLat >= 90) {
      return res
        .status(400)
        .json({ error: "Latitude must be between -90 and 90 degrees." });
    }
    if (userLon <= -180 || userLon >= 180) {
      return res
        .status(400)
        .json({ error: "Longitude must be between -180 and 180 degrees." });
    }

    const [schools] = await connection.execute("SELECT * FROM schools");

    // Attach distance and sort
    const sorted = schools
      .map((school) => ({
        ...school,
        distance: getDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(201).json({ sorted, message: "Schools listed successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addSchool, listSchools };
