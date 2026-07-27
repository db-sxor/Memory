document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    { name: "강기준", text: "여기에 메시지를 입력하세요." },
    { name: "강승식", text: "여기에 메시지를 입력하세요." },
    { name: "강호동", text: "여기에 메시지를 입력하세요." },
    { name: "권미애", text: "여기에 메시지를 입력하세요." },
    { name: "김동훈", text: "여기에 메시지를 입력하세요." },
    { name: "김보배", text: "여기에 메시지를 입력하세요." },
    { name: "김소희", text: "여기에 메시지를 입력하세요." },
    { name: "김수빈", text: "여기에 메시지를 입력하세요." },
    { name: "김 혁", text: "여기에 메시지를 입력하세요." },
    { name: "김현아", text: "여기에 메시지를 입력하세요." },
    { name: "김현정", text: "여기에 메시지를 입력하세요." },
    { name: "나용성", text: "여기에 메시지를 입력하세요." },
    { name: "나하나", text: "여기에 메시지를 입력하세요." },
    { name: "노경섭", text: "여기에 메시지를 입력하세요." },
    { name: "명미경", text: "여기에 메시지를 입력하세요." },
    { name: "박수정", text: "여기에 메시지를 입력하세요." },
    { name: "박혜정", text: "귀엽고 야무진 현채!! 어딜 가서도 잘할거라 믿어~^^" },
    { name: "송현경", text: "여기에 메시지를 입력하세요." },
    { name: "양상록", text: "여기에 메시지를 입력하세요." },
    { name: "오숙희", text: "여기에 메시지를 입력하세요." },
    { name: "윤정환", text: "여기에 메시지를 입력하세요." },
    { name: "이선희", text: "여기에 메시지를 입력하세요." },
    { name: "이유빈", text: "여기에 메시지를 입력하세요." },
    { name: "임병호", text: "여기에 메시지를 입력하세요." },
    { name: "임자연", text: "여기에 메시지를 입력하세요." },
    { name: "임종관", text: "여기에 메시지를 입력하세요." },
    { name: "장유진", text: "여기에 메시지를 입력하세요." },
    { name: "전미라", text: "여기에 메시지를 입력하세요." },
    { name: "전새라", text: "여기에 메시지를 입력하세요." },
    { name: "정남순", text: "여기에 메시지를 입력하세요." },
    { name: "정명희", text: "여기에 메시지를 입력하세요." },
    { name: "정선화", text: "힘들때. 너무 기쁠때 전화해~" },
    { name: "정유경", text: "여기에 메시지를 입력하세요." },
    { name: "정은순", text: "여기에 메시지를 입력하세요." },
    { name: "정인애", text: "여기에 메시지를 입력하세요." },
    { name: "정재영A", text: "여기에 메시지를 입력하세요." },
    { name: "정재영B", text: "여기에 메시지를 입력하세요." },
    { name: "조성령", text: "여기에 메시지를 입력하세요." },
    { name: "주애리", text: "여기에 메시지를 입력하세요." },
    { name: "최강수", text: "여기에 메시지를 입력하세요." },
    { name: "최슬기", text: "여기에 메시지를 입력하세요." },
    { name: "최의찬", text: "여기에 메시지를 입력하세요." },
    { name: "허만중", text: "여기에 메시지를 입력하세요." },
    { name: "허진수", text: "여기에 메시지를 입력하세요." }
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

  // ===== 2. 아래로 버튼 클릭 시 스크롤 이동 =====
  const scrollBtn = document.getElementById("scrollBtn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("timeline");
      if (!target) return;

      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200;
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

  // 플레이리스트
  const playlist = [
    "audio/song1.mp3",
    "audio/song2.mp3",
    "audio/song3.mp3",
    "audio/song4.mp3",
    "audio/song5.mp3"
  ];

  let currentSongIndex = -1;

  // 노래 랜덤재생 함수, 중복X
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
  setRandomSong();

  // 노래 끝나면 다음 곡 랜덤재생
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
        if (!bgm.src) setRandomSong();
        
        bgm.play();
        musicToggle.classList.add("playing");
      } else {
        bgm.pause();
        musicToggle.classList.remove("playing");
      }
    });
  }

  // ===== 4. 라이트박스 =====
  const galleryGrid = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxClose = document.getElementById("lightboxClose");

  // 동영상 열람 시 노래 일시정지 상태 기억 변수
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

        // 동영상 열기 전 배경음악이 켜져 있었는지 확인 및 일시정지
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
          lightboxVideo.play();
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

      // 동영상 열기 전 노래 켜져 있었으면 다시 재생
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