const { uploadGameListToS3 } = require("./gameListUploader");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.use("/api/game", require("./routes/game"));
app.use("/api/user", require("./routes/user")); 
app.use("/api/level", require("./routes/level")); 
app.use("/api/interaction", require("./routes/gameInteraction")); 
app.use("/api/user-stats", require("./routes/userStats"));

const PORT = 3000;
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await uploadGameListToS3();
    console.log("✅ S3에 gameList.json 생성 완료");
  } catch (err) {
    console.error("❌ gameList 업로드 실패:", err);
  }
});
