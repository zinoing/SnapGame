const fs = require("fs");
const db = require("./mysql");

async function runSchema() {
  const schema = fs.readFileSync(__dirname + "/schema/schema.sql", "utf8");
  await db.query(schema);
  console.log("✅ Schema applied.");
}
runSchema();
