const TIMEZONE = "Asia/Bangkok";
const TARGET_HOUR = 17;
const TARGET_MINUTE = 30;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const statusTextEl = document.getElementById("statusText");
const shareButton = document.getElementById("shareButton");

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

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");

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

updateCountdown();
window.setInterval(updateCountdown, 1000);
