import { getTotalCoinRanking, getUserCoinRank } from "../../api/rankApi.js";

export async function renderLeaderBoard(containerElement, currentUserId) {
  containerElement.innerHTML = "";

  const board = document.createElement("div");

  const title = document.createElement("h2");
  title.innerText = "🏆 Coin Leaderboard";
  board.appendChild(title);

  const list = document.createElement("ol");
  list.style.listStyle = "none";
  list.style.padding = "0";

  try {
    const topUsers = await getTotalCoinRanking();

    topUsers.forEach((user, index) => {
      const item = document.createElement("li");
      item.className = "leader-item";

      if (index === 0) item.classList.add("gold");
      else if (index === 1) item.classList.add("silver");
      else if (index === 2) item.classList.add("bronze");

      item.innerText = `${index + 1}. ${user.nickname || user.user_id} — 💰 ${user.coin}`;
      list.appendChild(item);
    });

    board.appendChild(list);
  } catch (err) {
    board.appendChild(document.createTextNode("⚠️ 랭킹 정보를 불러오지 못했습니다."));
    console.error(err);
  }

  if (currentUserId) {
    try {
      const myRank = await getUserCoinRank(currentUserId);
      const mine = document.createElement("div");
      mine.className = "my-rank";

      if (myRank && myRank.rank !== null) {
        mine.innerText = `🎖️ 내 순위: ${myRank.rank}위 — 💰 ${myRank.coin}`;
      } else {
        mine.innerText = `아직 랭킹 정보가 없습니다.`;
      }

      board.appendChild(mine);
    } catch (err) {
      console.error("내 랭킹 가져오기 실패:", err);
    }
  }

  containerElement.appendChild(board);
}
