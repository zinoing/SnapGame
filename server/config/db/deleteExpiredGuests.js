const db = require("./mysql");

async function deleteExpiredGuests() {
  const [users] = await db.query(`
    SELECT id FROM users WHERE is_guest = TRUE AND expires_at < NOW()
  `);

  if (users.length === 0) {
    console.log("No expired guest users to delete.");
    return;
  }

  const userIds = users.map(u => u.id);
  console.log(`Deleting data for ${userIds.length} expired guest(s)`);

  const placeholders = userIds.map(() => "?").join(",");

  await db.query(`DELETE FROM game_bookmarks WHERE user_id IN (${placeholders})`, userIds);
  await db.query(`DELETE FROM game_history WHERE user_id IN (${placeholders})`, userIds);
  await db.query(`DELETE FROM game_likes WHERE user_id IN (${placeholders})`, userIds);
  await db.query(`DELETE FROM game_results WHERE user_id IN (${placeholders})`, userIds);
  await db.query(`DELETE FROM game_sessions WHERE user_id IN (${placeholders})`, userIds);

  const [result] = await db.query(
    `DELETE FROM users WHERE id IN (${placeholders})`,
    userIds
  );

  console.log(`Deleted ${result.affectedRows} guest user(s) and their associated data`);
}

module.exports = deleteExpiredGuests;
