const TIMEZONE = "Asia/Bangkok";
const WORK_START_HOUR = 9;
const WORK_START_MINUTE = 30;
const LUNCH_START_HOUR = 12;
const LUNCH_START_MINUTE = 0;
const LUNCH_END_HOUR = 13;
const LUNCH_END_MINUTE = 15;
const TARGET_HOUR = 17;
const TARGET_MINUTE = 30;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const statusTextEl = document.getElementById("statusText");
const shareButton = document.getElementById("shareButton");
const progressFillEl = document.getElementById("progressFill");
const progressPercentEl = document.getElementById("progressPercent");
const shuffleMemeButton = document.getElementById("shuffleMemeButton");
const memePrimaryImageEl = document.getElementById("memePrimaryImage");
const memePrimaryLinkEl = document.getElementById("memePrimaryLink");

const MEME_POOL = [
  {
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2p3aXg4ZHoxaDdqNXdjYnJvNXc0bmtjZDcxeHE3cHJyeHNmb2xiNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EtB1yylKGGAUg/giphy.gif",
    link: "https://giphy.com/gifs/EtB1yylKGGAUg",
  },
  {
    image:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dTNoNGlyaDJiczhxajZ1MDV3b3dmbHE3Y2V3YXB0eXZtNW5qb3d4YyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/M11UVCRrc0LUk/giphy.gif",
    link: "https://giphy.com/gifs/M11UVCRrc0LUk",
  },
  {
    image:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dTNoNGlyaDJiczhxajZ1MDV3b3dmbHE3Y2V3YXB0eXZtNW5qb3d4YyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/xiAqCzbB3eZvG/giphy.gif",
    link: "https://giphy.com/gifs/xiAqCzbB3eZvG",
  },
  {
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmxiemQ3cHpzaWIyZjVhOG01M2l1dG1qcDB4Mzd0NDR2eGdwazlndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LTyOTsYnsgidO/giphy.gif",
    link: "https://giphy.com/gifs/LTyOTsYnsgidO",
  },
  {
    image:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dTNoNGlyaDJiczhxajZ1MDV3b3dmbHE3Y2V3YXB0eXZtNW5qb3d4YyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/KLO1hNEky1fMc/giphy.gif",
    link: "https://giphy.com/gifs/KLO1hNEky1fMc",
  },
  {
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXJlMmJvbzFsa2h6MDFjNHRzOWlpeHYzOThla3ZnZGZ3YXpscGJuayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6RIFKaxkSMv3AxGviq/giphy.gif",
    link: "https://giphy.com/gifs/6RIFKaxkSMv3AxGviq",
  },
  {
    image:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bmN6N2o0bDAyeW1mNmh5MWlsN3k3bXphamY0ZnU5b3hjdTBpbzM1NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/q5wGGn2XrwWDJA7yQs/giphy.gif",
    link: "https://giphy.com/gifs/q5wGGn2XrwWDJA7yQs",
  },
  {
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjM0aHByNXk4OHBwam5rYjVoN3Bodml4azZwNDhmb2NsaDdkYmw0cCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/kE9KzuKjCgKX45P6Ud/giphy.gif",
    link: "https://giphy.com/gifs/kE9KzuKjCgKX45P6Ud",
  },
  {
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExazc3cnl3bzh6dGptemNuZnloZmhqY2xrZGlqbTB3YjN5b3dkY25jeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4GWmvKBiml8vPQUchI/giphy.gif",
    link: "https://giphy.com/gifs/4GWmvKBiml8vPQUchI",
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
  const lunchStartMs = workdayBoundaryMs(LUNCH_START_HOUR, LUNCH_START_MINUTE);
  const lunchEndMs = workdayBoundaryMs(LUNCH_END_HOUR, LUNCH_END_MINUTE);
  const lunchSpanMs = lunchEndMs - lunchStartMs;
  const spanMs = endMs - startMs - lunchSpanMs;

  if (localNowMs <= startMs) {
    return 0;
  }

  if (localNowMs >= endMs) {
    return 100;
  }

  let elapsedMs = localNowMs - startMs;

  if (localNowMs >= lunchStartMs && localNowMs < lunchEndMs) {
    elapsedMs = lunchStartMs - startMs;
  } else if (localNowMs >= lunchEndMs) {
    elapsedMs -= lunchSpanMs;
  }

  return (elapsedMs / spanMs) * 100;
}

function isLunchBreak() {
  const localNowMs = bangkokNowMs();
  const lunchStartMs = workdayBoundaryMs(LUNCH_START_HOUR, LUNCH_START_MINUTE);
  const lunchEndMs = workdayBoundaryMs(LUNCH_END_HOUR, LUNCH_END_MINUTE);

  return localNowMs >= lunchStartMs && localNowMs < lunchEndMs;
}

function setRandomMeme() {
  if (MEME_POOL.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * MEME_POOL.length);
  const meme = MEME_POOL[randomIndex];

  memePrimaryImageEl.src = meme.image;
  memePrimaryLinkEl.href = meme.link;
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

  if (isLunchBreak()) {
    statusTextEl.textContent = "พักเที่ยง 12:00 - 13:15 กินข้าวให้อร่อย";
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
