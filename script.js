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
const memeTitleEl = document.getElementById("memeTitle");
const memeTextEl = document.getElementById("memeText");
const memeImageEl = document.getElementById("memeImage");
const memeCaptionEl = document.getElementById("memeCaption");
const memeLinkEl = document.getElementById("memeLink");
const shuffleMemeButton = document.getElementById("shuffleMemeButton");

const MEME_POOL = [
  {
    image:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PFU8k1XXgytJVWZykC/giphy.gif",
    link: "https://giphy.com/search/%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99",
    caption: "สุ่มจากกองมีมเลิกงาน: วิญญาณพร้อมกลับบ้านก่อนตัวจริง",
  },
  {
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/q4QfjGnFKryzjosj1g/giphy.gif",
    link: "https://giphy.com/search/%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99",
    caption: "สุ่มจากกองมีมเลิกงาน: ถ้า message ใหม่เด้งอีกคือร้องจริง",
  },
  {
    image:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUA7b30EbtkaMHvRgk/giphy.gif",
    link: "https://giphy.com/search/%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99",
    caption: "สุ่มจากกองมีมเลิกงาน: ใกล้เวลาแล้ว พลังเต้นเริ่มมา",
  },
  {
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif",
    link: "https://giphy.com/search/%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99",
    caption: "สุ่มจากกองมีมเลิกงาน: จิตใจ checkout ไปแล้ว เหลือแต่ cursor",
  },
  {
    image:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzc2ZHRwYTFoZGJ5d2Y1Z2h1dnlzbmpuYjlzODE2ZW9zcm5uMThuaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6ZsY8f6iY7Rr5fDG/giphy.gif",
    link: "https://giphy.com/search/%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99",
    caption: "สุ่มจากกองมีมเลิกงาน: อีกนิดเดียวก็ได้ประกาศอิสรภาพ",
  },
];

const MEME_STAGES = [
  {
    min: 0,
    title: "กำลังบูตสมองทีมแชตบอต",
    text: "กาแฟเข้าระบบแล้ว เหลือแค่ประชุมกับบั๊กให้จบก่อน 17:30",
  },
  {
    min: 25,
    title: "เริ่มไหลลื่น แต่ยังไม่กล้าปิด Slack",
    text: "งานเดินแล้ว แต่ notification ยังพร้อมโผล่มาได้ทุกเมื่อ",
  },
  {
    min: 50,
    title: "เข้าโหมดนับชั่วโมงแบบมืออาชีพ",
    text: "ทุกคนเริ่มพูดคำว่า 'อันนี้ขอพรุ่งนี้ได้ไหม' มากขึ้นอย่างมีนัยสำคัญ",
  },
  {
    min: 75,
    title: "เก็บของในใจไปแล้วครึ่งทีม",
    text: "แท็บงานยังเปิดอยู่ แต่จิตวิญญาณยืนรอลิฟต์ตั้งแต่เมื่อกี้แล้ว",
  },
  {
    min: 100,
    title: "เลิกงานแล้ว ทีมแชตบอตเป็นอิสระ",
    text: "ปิดโน้ตบุ๊กได้แบบไม่ต้องรู้สึกผิด แล้วค่อยสู้กับ prompt ต่อพรุ่งนี้",
  },
];

let activeMemeIndex = -1;

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
  if (MEME_POOL.length === 0) {
    return;
  }

  let nextIndex = Math.floor(Math.random() * MEME_POOL.length);

  if (MEME_POOL.length > 1 && nextIndex === activeMemeIndex) {
    nextIndex = (nextIndex + 1) % MEME_POOL.length;
  }

  activeMemeIndex = nextIndex;

  const meme = MEME_POOL[nextIndex];
  memeImageEl.src = meme.image;
  memeLinkEl.href = meme.link;
  memeCaptionEl.textContent = meme.caption;
}

function updateProgress(progress) {
  const rounded = Math.round(progress);
  progressFillEl.style.width = `${Math.max(rounded, 8)}%`;
  progressPercentEl.textContent = `${rounded}%`;
  progressFillEl.parentElement.setAttribute("aria-valuenow", String(rounded));

  const stage =
    [...MEME_STAGES].reverse().find((item) => rounded >= item.min) || MEME_STAGES[0];

  memeTitleEl.textContent = stage.title;
  memeTextEl.textContent = stage.text;

  if (rounded <= 0) {
    progressStatusEl.textContent = "เริ่มนับหลัง 09:30";
    return;
  }

  if (rounded >= 100) {
    progressStatusEl.textContent = "ถึงเส้นชัย 17:30 แล้ว";
    return;
  }

  progressStatusEl.textContent = "กาแฟกำลังพาทีมไปสู่เวลาเลิกงาน";
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
