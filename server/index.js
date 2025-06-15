const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.use("/api/game", require("./routes/game"));
app.use("/api/user", require("./routes/user")); 
app.use("/api/level", require("./routes/level")); 
app.use("/api/user-stats", require("./routes/userStats.js"));

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
