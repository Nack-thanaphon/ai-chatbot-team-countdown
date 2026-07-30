const TIMEZONE = "Asia/Bangkok";
const WORK_START_HOUR = 9;
const WORK_START_MINUTE = 30;
const TARGET_HOUR = 17;
const TARGET_MINUTE = 30;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const statusTextEl = document.getElementById("statusText");
const shareButton = document.getElementById("shareButton");
const progressFillEl = document.getElementById("progressFill");
const progressPercentEl = document.getElementById("progressPercent");
const progressStatusEl = document.getElementById("progressStatus");
const memeLinkEl = document.getElementById("memeLink");
const shuffleMemeButton = document.getElementById("shuffleMemeButton");
const memePrimaryImageEl = document.getElementById("memePrimaryImage");
const memePrimaryLinkEl = document.getElementById("memePrimaryLink");
const memeSecondaryImageEls = [
  document.getElementById("memeSecondaryImage1"),
  document.getElementById("memeSecondaryImage2"),
  document.getElementById("memeSecondaryImage3"),
];
const memeSecondaryLinkEls = [
  document.getElementById("memeSecondaryLink1"),
  document.getElementById("memeSecondaryLink2"),
  document.getElementById("memeSecondaryLink3"),
];

const MEME_POOL = [
  {
    image:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PFU8k1XXgytJVWZykC/giphy.gif",
    link: "https://giphy.com/gifs/PFU8k1XXgytJVWZykC",
  },
  {
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/q4QfjGnFKryzjosj1g/giphy.gif",
    link: "https://giphy.com/gifs/q4QfjGnFKryzjosj1g",
  },
  {
    image:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUA7b30EbtkaMHvRgk/giphy.gif",
    link: "https://giphy.com/gifs/xUA7b30EbtkaMHvRgk",
  },
  {
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif",
    link: "https://giphy.com/gifs/l0MYt5jPR6QX5pnqM",
  },
  {
    image:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6ZsY8f6iY7Rr5fDG/giphy.gif",
    link: "https://giphy.com/gifs/3o6ZsY8f6iY7Rr5fDG",
  },
  {
    image:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/12XDYvMJNcmLgQ/giphy.gif",
    link: "https://giphy.com/gifs/12XDYvMJNcmLgQ",
  },
  {
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11gC4odpiRKuha/giphy.gif",
    link: "https://giphy.com/gifs/11gC4odpiRKuha",
  },
  {
    image:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LmNwrBhejkK9EFP504/giphy.gif",
    link: "https://giphy.com/gifs/LmNwrBhejkK9EFP504",
  },
  {
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26u4cqiYI30juCOGY/giphy.gif",
    link: "https://giphy.com/gifs/26u4cqiYI30juCOGY",
  },
  {
    image:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlBO7eyXzSZkJri/giphy.gif",
    link: "https://giphy.com/gifs/l0HlBO7eyXzSZkJri",
  },
  {
    image:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26ufdipQqU2lhNA4g/giphy.gif",
    link: "https://giphy.com/gifs/26ufdipQqU2lhNA4g",
  },
];

function getBangkokDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
    hour: Number(lookup.hour),
    minute: Number(lookup.minute),
    second: Number(lookup.second),
  };
}

function bangkokNowMs() {
  const now = new Date();
  const local = new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
  return local.getTime();
}

function targetBangkokMs() {
  const nowParts = getBangkokDateParts();
  const localNowMs = bangkokNowMs();
  const targetToday = new Date(
    nowParts.year,
    nowParts.month - 1,
    nowParts.day,
    TARGET_HOUR,
    TARGET_MINUTE,
    0
  ).getTime();

  if (localNowMs <= targetToday) {
    return targetToday;
  }

  return new Date(
    nowParts.year,
    nowParts.month - 1,
    nowParts.day + 1,
    TARGET_HOUR,
    TARGET_MINUTE,
    0
  ).getTime();
}

function workdayBoundaryMs(hour, minute) {
  const nowParts = getBangkokDateParts();
  return new Date(
    nowParts.year,
    nowParts.month - 1,
    nowParts.day,
    hour,
    minute,
    0
  ).getTime();
}

function getWorkdayProgress() {
  const localNowMs = bangkokNowMs();
  const startMs = workdayBoundaryMs(WORK_START_HOUR, WORK_START_MINUTE);
  const endMs = workdayBoundaryMs(TARGET_HOUR, TARGET_MINUTE);
  const spanMs = endMs - startMs;

  if (localNowMs <= startMs) {
    return 0;
  }

  if (localNowMs >= endMs) {
    return 100;
  }

  return ((localNowMs - startMs) / spanMs) * 100;
}

function setRandomMeme() {
  if (MEME_POOL.length < 4) {
    return;
  }

  const pool = [...MEME_POOL];
  const selectedMemes = [];

  while (selectedMemes.length < 4 && pool.length > 0) {
    const nextIndex = Math.floor(Math.random() * pool.length);
    selectedMemes.push(pool.splice(nextIndex, 1)[0]);
  }

  const [primaryMeme, ...secondaryMemes] = selectedMemes;

  memePrimaryImageEl.src = primaryMeme.image;
  memePrimaryLinkEl.href = primaryMeme.link;
  memeLinkEl.href = primaryMeme.link;

  secondaryMemes.forEach((meme, index) => {
    memeSecondaryImageEls[index].src = meme.image;
    memeSecondaryLinkEls[index].href = meme.link;
  });
}

function updateProgress(progress) {
  const rounded = Math.round(progress);
  progressFillEl.style.width = `${Math.max(rounded, 8)}%`;
  progressPercentEl.textContent = `${rounded}%`;
  progressFillEl.parentElement.setAttribute("aria-valuenow", String(rounded));
}

function formatThaiDate() {
  return new Intl.DateTimeFormat("th-TH", {
    timeZone: TIMEZONE,
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());
}

function updateCountdown() {
  const remainingMs = Math.max(targetBangkokMs() - bangkokNowMs(), 0);
  const totalSeconds = Math.floor(remainingMs / 1000);
  const progress = getWorkdayProgress();

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
  updateProgress(progress);

  if (totalSeconds === 0) {
    statusTextEl.textContent = "ถึงเวลาเลิกงานแล้ว พักได้เลย";
    return;
  }

  statusTextEl.textContent = `เวลาประเทศไทยตอนนี้: ${formatThaiDate()}`;
}

async function copyShareLink() {
  const originalText = shareButton.textContent;

  try {
    await navigator.clipboard.writeText(window.location.href);
    shareButton.textContent = "คัดลอกลิงก์แล้ว";
  } catch (error) {
    shareButton.textContent = "คัดลอกไม่สำเร็จ";
  }

  window.setTimeout(() => {
    shareButton.textContent = originalText;
  }, 1800);
}

shareButton.addEventListener("click", copyShareLink);
shuffleMemeButton.addEventListener("click", setRandomMeme);

setRandomMeme();
updateCountdown();
window.setInterval(updateCountdown, 1000);
