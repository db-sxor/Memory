document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    { name: "강기준", text: "" },
    { name: "강승식", text: "" },
    { name: "강호동", text: "차형제 부부가 회중을 위해 노력한 일들을 그 누구보다 여호와께서 잘 아실거에요. 많은 축복도 있었겠죠? 고양수어 회중에도 좋은 영향력을 주어 많은 사랑 받는 부부가 되길 바래요" },
    { name: "권미애", text: "저희 부부에게는 자랑스러운 부부입니다. - 고후1:14" },
    { name: "김동훈", text: "다시 돌아와 만날때까지~안녕히!" },
    { name: "김보배", text: "" },
    { name: "김소희", text: "" },
    { name: "김수빈", text: "차부부~ 그동안 회중에 보여주신 마음과 수고에 감사해요. 고양 가서도 물론 금방 적응하겠지만 가서도 지치지 않고 건강하게 행복하게 지내길 바래요" },
    { name: "김수진", text: "무슨 일이든 항상 날 웃게 해주는 현채! 고마워!" },
    { name: "김 혁", text: "시편 43:3 항상 여호와의 인도에 고착하여 그분의 축복으로 행복하기를...." },
    { name: "김현아", text: "그동안 수고많으셨어요 건강히 행복한 모습으로 또 만나길 바랄께요~^^" },
    { name: "김현정", text: "" },
    { name: "나용성", text: "" },
    { name: "나하나", text: "현채이모와 차형제가 함께했던 회중생활은 한층더 즐겁고 활기찼던 것 같아요!! 언제나 감사했고 새 회중에서도 그 에너지는 누구나 느낄 수 있을 거에요💕 화이팅!!" },
    { name: "노경섭", text: "" },
    { name: "명미경", text: "" },
    { name: "박수정", text: "" },
    { name: "박혜정", text: "귀엽고 야무진 현채!! 어딜 가서도 잘할거라 믿어~^^" },
    { name: "송현경", text: "" },
    { name: "양상록", text: "더 필요한 곳으로 가는 차진주, 송현채 부부^^ 새로운 회중에 잘 적응할거라 확신해. 그리고 여호와께서 크게 사용하실거야. 잘 준비하고 있으셔~" },
    { name: "오숙희", text: "내 아들같고 내 딸같은 차진주형제 송현채자매부부 그동안 수고많으셨습니다 우린 가족이니까 다시 만날날을 기대합니다 어디에 있든지 여호와의 축복이 차형제부부에게 넘치기를 기도합니다♡♡" },
    { name: "윤정환", text: "" },
    { name: "이선희", text: "차진주형제 송현채자매 두분의 훌륭한 선택과 결정에 여호와께서 넘치도록 풍부한 축복을 주실겁니다! 항상 응원합니다^^" },
    { name: "이유빈", text: "회중의 진주였던 차진주형제, 현채언니 항상 여호와의 영이 함께하길 바래요~" },
    { name: "임병호", text: "" },
    { name: "임자연", text: "" },
    { name: "임종관", text: "" },
    { name: "장유진", text: "같이한 시간이 짧았지만, 그시간들이 참 소중하네요. 매일 매일이 행복하길 바랄게요" },
    { name: "전미라", text: "" },
    { name: "전새라", text: "" },
    { name: "정남순", text: "" },
    { name: "정명희", text: "" },
    { name: "정선화", text: "힘들때. 너무 기쁠때 전화해~" },
    { name: "정유경", text: "" },
    { name: "정은순", text: "" },
    { name: "정인애", text: "" },
    { name: "정재영A", text: "" },
    { name: "정재영B", text: "" },
    { name: "조성령", text: "" },
    { name: "주애리", text: "여호와께서 앞으로 어떤 일들을 맡겨주실지 너무너무 기대되는 훌륭한 부부❤️" },
    { name: "최강수", text: "" },
    { name: "최슬기", text: "" },
    { name: "최의찬", text: "" },
    { name: "허만중", text: "" },
    { name: "허진수", text: "" }
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
      const target = document.getElementById("gallery");
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