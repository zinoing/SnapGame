const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/game", require("./routes/game"));
app.use("/api/user", require("./routes/user")); 

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
