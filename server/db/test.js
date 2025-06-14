const db = require("./mysql");

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("✅ MySQL connection works:", rows);
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
}

testConnection();