document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. 메시지 데이터 & 카드 생성 =====
  const messages = [
    { name: "○○○", text: "여기에 메시지를 입력하세요." },
    { name: "○○○", text: "여기에 메시지를 입력하세요." },
    { name: "○○○", text: "여기에 메시지를 입력하세요." },
    // 필요한 만큼 계속 추가하면 됩니다
  ];

  function renderMessages() {
    const wall = document.getElementById("messageWall");
    if (!wall) return;
    wall.innerHTML = messages
      .map(
        (m) => `
      <div class="message-card">
        <p>${m.text}</p>
        <span class="message-name">${m.name}</span>
      </div>
    `
      )
      .join("");
  }
  renderMessages();

  // ===== 2. 천천히 부드럽게 스크롤 이동 (아래로 ↓ 버튼 클릭 시) =====
  const scrollBtn = document.getElementById("scrollBtn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("timeline");
      if (!target) return;

      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // 이동 시간 (1200ms = 1.2초)
      let start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const ease =
          progress / (duration / 2) < 1
            ? 0.5 * Math.pow(progress / (duration / 2), 2)
            : -0.5 * (--progress * (progress - 2) - 1);

        window.scrollTo(0, startPosition + distance * ease);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    });
  }

  const bgm = document.getElementById("bgm");
  const musicToggle = document.getElementById("musicToggle");

  // 🎵 5개의 음악 파일 경로 목록
  const playlist = [
    "audio/song1.mp3",
    "audio/song2.mp3",
    "audio/song3.mp3",
    "audio/song4.mp3",
    "audio/song5.mp3"
  ];

  let currentSongIndex = -1;

  // 랜덤으로 노래를 선택하는 함수 (바로 직전에 나온 노래는 연속으로 나오지 않게 처리)
  function setRandomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * playlist.length);
    } while (newIndex === currentSongIndex && playlist.length > 1);

    currentSongIndex = newIndex;
    if (bgm) {
      bgm.src = playlist[currentSongIndex];
    }
  }

  // 처음 페이지 로드 시 첫 랜덤 곡 세팅
  setRandomSong();

  // 노래 한 곡이 끝나면 다음 곡을 자동으로 랜덤 선택해서 계속 재생
  if (bgm) {
    bgm.addEventListener("ended", () => {
      setRandomSong();
      bgm.play();
    });
  }

  // 음악 재생 / 정지 토글 버튼 이벤트
  if (bgm && musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (bgm.paused) {
        // 음원이 안 적혀있으면 랜덤 곡 지정
        if (!bgm.src) setRandomSong();
        
        bgm.play();
        musicToggle.classList.add("playing");
      } else {
        bgm.pause();
        musicToggle.classList.remove("playing");
      }
    });
  }

  // ===== 4. 라이트박스 (사진 & 동영상 클릭 시 확대) =====
  const galleryGrid = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxClose = document.getElementById("lightboxClose");

  // 동영상 열람 시 BGM 일시정지 상태를 기억하기 위한 변수
  let wasBgmPlayingBeforeVideo = false;

  if (galleryGrid && lightbox) {
    galleryGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".photo-card");
      if (!card) return;

      const img = card.querySelector("img");
      const video = card.querySelector("video");

      if (img) {
        if (lightboxVideo) {
          lightboxVideo.pause();
          lightboxVideo.style.display = "none";
        }
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
        lightboxImg.style.display = "block";
        lightbox.classList.add("active");
      } else if (video) {
        if (lightboxImg) lightboxImg.style.display = "none";

        // 동영상 열기 전, 배경음악이 켜져 있었는지 확인 및 일시정지
        if (bgm && !bgm.paused) {
          wasBgmPlayingBeforeVideo = true;
          bgm.pause();
          if (musicToggle) musicToggle.classList.remove("playing");
        } else {
          wasBgmPlayingBeforeVideo = false;
        }

        if (lightboxVideo) {
          lightboxVideo.src = video.src;
          lightboxVideo.style.display = "block";
          lightboxVideo.play(); // 동영상 소리 포함 재생
        }
        lightbox.classList.add("active");
      }
    });

    // 라이트박스 닫기 함수
    function closeLightbox() {
      lightbox.classList.remove("active");
      
      // 동영상이 재생 중이었다면 멈추기
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.src = "";
      }

      // 동영상 열기 전에 BGM이 켜져 있었다면 다시 재생
      if (wasBgmPlayingBeforeVideo && bgm) {
        bgm.play();
        if (musicToggle) musicToggle.classList.add("playing");
        wasBgmPlayingBeforeVideo = false; // 상태 리셋
      }
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('musicTooltip');

  if (tooltip) {
    setTimeout(() => {
      tooltip.classList.add('fade-out');
    }, 5000);
  }
});