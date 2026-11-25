let skills = [
  { name: "HTML", status: "atlikta", xp: 40 },
  { name: "CSS", status: "atlikta", xp: 40 },
  { name: "JavaScript", status: "mokomasi", xp: 60 },
  { name: "Python", status: "mokomasi", xp: 60 },
  { name: "SQL", status: "mokomasi", xp: 50 },
  { name: "C++", status: "planuojama", xp: 50 },
  { name: "TensorFlow", status: "planuojama", xp: 80 },
  { name: "Git", status: "planuojama", xp: 20 }
];

// LocalStorage

let savedSkills = localStorage.getItem("skills");

if (savedSkills) {
  skills = JSON.parse(savedSkills);
}

function saveSkills() {
  localStorage.setItem("skills", JSON.stringify(skills));
}

// Kanban

function renderSkills() {
  document.getElementById("planuojama").innerHTML = "";
  document.getElementById("mokomasi").innerHTML = "";
  document.getElementById("atlikta").innerHTML = "";

  skills.forEach((skill, index) => {
    let card = document.createElement("div");

    card.className = "skill-card";

    card.innerHTML = `
      <h4>${skill.name}</h4>
      <p>${skill.xp} XP</p>

      <select onchange="changeStatus(${index}, this.value)">
        <option value="planuojama">Planuojama</option>
        <option value="mokomasi">Mokomasi</option>
        <option value="atlikta">Atlikta</option>
      </select>
    `;

    card.querySelector("select").value = skill.status;

    document.getElementById(skill.status).appendChild(card);
  });
}

// Busenos keitimas

function changeStatus(index, status) {
  skills[index].status = status;

  saveSkills();
  renderSkills();
  updateProgress();
  updateStatistics();
  updateAchievements();
}

// XP skaiciavimas

function calculateXP() {
  let totalXP = 0;

  skills.forEach(skill => {
    if (skill.status === "atlikta") {
      totalXP += skill.xp;
    }
  });

  return totalXP;
}

// Vartotojo ikonele

function updateAvatar(level) {
  let avatar = document.getElementById("user-avatar");

  if (level === 4) {
    avatar.src = "assets/img/level4.svg";
  } else if (level === 3) {
    avatar.src = "assets/img/level3.svg";
  } else if (level === 2) {
    avatar.src = "assets/img/level2.svg";
  } else {
    avatar.src = "assets/img/level1.svg";
  }
}

// Lygis, rangas ir pazanga

function updateProgress() {
  let xp = calculateXP();

  let level;
  let rank;
  let progress;
  let nextLevel;

  if (xp >= 300) {
    level = 4;
    rank = "Profesionalas";
    progress = 100;
    nextLevel = 300;

  } else if (xp >= 150) {
    level = 3;
    rank = "Specialistas";
    progress = (xp - 150) / 150 * 100;
    nextLevel = 300;

  } else if (xp >= 50) {
    level = 2;
    rank = "Praktikantas";
    progress = (xp - 50) / 100 * 100;
    nextLevel = 150;

  } else {
    level = 1;
    rank = "Pradedantysis";
    progress = xp / 50 * 100;
    nextLevel = 50;
  }

  document.getElementById("total-xp").textContent = xp + " XP";
  document.getElementById("level").textContent = level;
  document.getElementById("rank").textContent = rank;

  document.getElementById("xp-progress-bar").style.width = progress + "%";

  document.getElementById("progress-percent").textContent =
    Math.round(progress) + "%";

  if (level === 4) {
    document.getElementById("progress-text").textContent =
      "Pasiektas maksimalus lygis!";
  } else {
    document.getElementById("progress-text").textContent =
      "Iki kito lygio liko " + (nextLevel - xp) + " XP";
  }

  updateAvatar(level);
}

// Statistika

function updateStatistics() {
  let total = skills.length;

  let completed = skills.filter(skill =>
    skill.status === "atlikta"
  ).length;

  let percent = completed / total * 100;

  document.getElementById("total-skills").textContent = total;

  document.getElementById("completed-skills").textContent = completed;

  document.getElementById("completed-percent").textContent =
    Math.round(percent) + "%";
}

// Pasiekimai

function updateAchievements() {
  let completed = skills.filter(skill =>
    skill.status === "atlikta"
  ).length;

  let xp = calculateXP();

  document.getElementById("achievement1")
    .classList.toggle("unlocked", completed >= 1);

  document.getElementById("achievement2")
    .classList.toggle("unlocked", completed >= 4);

  document.getElementById("achievement3")
    .classList.toggle("unlocked", xp >= 300);
}

// Paleidimas

renderSkills();
updateProgress();
updateStatistics();
updateAchievements();