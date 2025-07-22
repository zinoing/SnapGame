// client/ui/top-banner/top-banner.js

export function renderTopBanner(containerId = "app") {
  fetch("ui/top-banner/top-banner.html")
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById(containerId);
      container.insertAdjacentHTML("afterbegin", html);

      // 플레이 버튼 클릭 이벤트
      const playButton = container.querySelector(".play-button");
      if (playButton) {
        playButton.addEventListener("click", () => {
          alert("게임 시작: Poxel.io");
          // TODO: 게임 실행 로직 연결
        });
      }
    });
}
