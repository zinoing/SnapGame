const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const { server } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.use('/api/users', require('./routes/user'));
app.use('/api/games', require('./routes/game'));
app.use('/api/interactions', require('./routes/gameInteraction'));
app.use('/api/stats', require('./routes/userStats'));

app.listen(server.port, "0.0.0.0", async () => {
  console.log(`Server running on port ${server.port}`);
});
