const TIMEZONE = "Asia/Bangkok";
const WORK_START_HOUR = 9;
const WORK_START_MINUTE = 0;
const TARGET_HOUR = 17;
const TARGET_MINUTE = 30;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const statusTextEl = document.getElementById("statusText");
const shareButton = document.getElementById("shareButton");
const progressFillEl = document.getElementById("progressFill");
const progressPercentEl = document.getElementById("progressPercent");
const memeFaceEl = document.getElementById("memeFace");
const memeTitleEl = document.getElementById("memeTitle");
const memeTextEl = document.getElementById("memeText");

const MEME_STAGES = [
  {
    min: 0,
    title: "กำลังบูตสมองทีมแชตบอต",
    text: "กาแฟเข้าระบบแล้ว เหลือแค่ประชุมกับบั๊กให้จบก่อน 17:30",
    face: "(-_-)",
  },
  {
    min: 25,
    title: "เริ่มไหลลื่น แต่ยังไม่กล้าปิด Slack",
    text: "งานเดินแล้ว แต่ notification ยังพร้อมโผล่มาได้ทุกเมื่อ",
    face: "(._.)",
  },
  {
    min: 50,
    title: "เข้าโหมดนับชั่วโมงแบบมืออาชีพ",
    text: "ทุกคนเริ่มพูดคำว่า 'อันนี้ขอพรุ่งนี้ได้ไหม' มากขึ้นอย่างมีนัยสำคัญ",
    face: "(o_o)",
  },
  {
    min: 75,
    title: "เก็บของในใจไปแล้วครึ่งทีม",
    text: "แท็บงานยังเปิดอยู่ แต่จิตวิญญาณยืนรอลิฟต์ตั้งแต่เมื่อกี้แล้ว",
    face: "(^_^)",
  },
  {
    min: 100,
    title: "เลิกงานแล้ว ทีมแชตบอตเป็นอิสระ",
    text: "ปิดโน้ตบุ๊กได้แบบไม่ต้องรู้สึกผิด แล้วค่อยสู้กับ prompt ต่อพรุ่งนี้",
    face: "(^o^)/",
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

function updateProgress(progress) {
  const rounded = Math.round(progress);
  progressFillEl.style.width = `${rounded}%`;
  progressPercentEl.textContent = `${rounded}%`;
  progressFillEl.parentElement.setAttribute("aria-valuenow", String(rounded));

  const stage =
    [...MEME_STAGES].reverse().find((item) => rounded >= item.min) || MEME_STAGES[0];

  memeFaceEl.textContent = stage.face;
  memeTitleEl.textContent = stage.title;
  memeTextEl.textContent = stage.text;
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

updateCountdown();
window.setInterval(updateCountdown, 1000);
