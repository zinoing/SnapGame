const { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs").promises;
const path = require("path");
const { getGameList } = require("./repositories/gameRepository");

const s3 = new S3Client({
  region: "ap-northeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = "snapgame";
const GAME_LIST_KEY = "games/gameList.json";

async function uploadGameListToS3() {
  const gameList = await getGameList();

  const jsonString = JSON.stringify(gameList, null, 2);

  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: GAME_LIST_KEY }));
    console.log("기존 gameList.json 존재 → 삭제합니다.");
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: GAME_LIST_KEY }));
  } catch (err) {
    if (err.name !== "NotFound") {
      console.error("S3 파일 확인 중 오류:", err);
      throw err;
    }
  }

  const uploadCmd = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: GAME_LIST_KEY,
    Body: jsonString,
    ContentType: "application/json",
  });

  await s3.send(uploadCmd);
  console.log("✅ gameList.json 업로드 완료");
}

module.exports = { uploadGameListToS3 };