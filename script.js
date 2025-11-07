const API_KEY = "829fdad001a7ddf52aeb0f6a69415018";

const elGrid = document.getElementById("grid");
const elStatus = document.getElementById("status");
const elLeagueTitle = document.getElementById("leagueTitle");  // nur auf ligen.html
const elStandingsBody = document.getElementById("standingsBody"); // nur auf ligen.html

// ---------- STARTSEITE: Ligen laden & Karten rendern ----------
if (elGrid) {
  initHome();
}

async function initHome() {
  setStatus("⚽ Ligen werden geladen...");

  try {
    const data = await fetchLeagues();
    const leagues = Array.isArray(data?.response) ? data.response : [];

    // Nur die 5 Top-Ligen auswählen (IDs laut API-FOOTBALL)
    const topIds = [39, 140, 135, 78, 61]; // Premier, LaLiga, SerieA, Bundesliga, Ligue1
    const filtered = leagues.filter(l => topIds.includes(l.league.id));

    renderLeagues(filtered);
    setStatus("");
  } catch (err) {
    console.error(err);
    setStatus("Fehler beim Laden der Ligen.");
  }
}


function renderLeagues(items) {
  elGrid.innerHTML = "";
  items.forEach(it => {
    const id = it.league?.id;
    const name = it.league?.name || "Unbekannte Liga";
    const country = it.country?.name || "–";

    const card = document.createElement("article");
    card.className = "card js-league";
    card.dataset.leagueId = id;
    card.dataset.league = name;
    card.dataset.country = country;

    card.innerHTML = `
      <h3>${name}</h3>
      <p>${country}</p>
      <a class="btn" href="ligen.html">Öffnen</a>
    `;
    elGrid.appendChild(card);
  });
}

function pickUniqueLeagues(items) {
  const map = new Map();
  for (const it of items) {
    const id = it.league?.id;
    if (!id) continue;
    const current = !!it.seasons?.find?.(s => s.current);
    if (!map.has(id) || current) map.set(id, it);
  }
  return [...map.values()];
}

function setStatus(msg) {
  if (elStatus) elStatus.textContent = msg;
}

// ---------- LIGEN-SEITE: Auswahl lesen & ggf. Tabelle laden ----------
if (elLeagueTitle) {
  initLeaguePage();
}

async function initLeaguePage() {
  // Auswahl lesen
  const raw = localStorage.getItem("selectedLeague");
  if (!raw) {
    elLeagueTitle.textContent = "Keine Liga ausgewählt";
    return;
  }
  const sel = JSON.parse(raw);
  elLeagueTitle.textContent = `${sel.name} – Tabelle`;

  // (einfacher) Saison bestimmen
  const season = new Date().getFullYear(); // bei Bedarf anpassen (z. B. 2024)
  try {
    const url = `https://v3.football.api-sports.io/standings?league=${sel.id}&season=${season}`;
    const data = await fetchAPI(url);

    // Struktur der API: data.response[0].league.standings[0] = Array der Teams
    const standings =
      data?.response?.[0]?.league?.standings?.[0] || [];

    // Fallback: nichts gefunden → Hinweis
    if (!standings.length) {
      elStandingsBody.innerHTML =
        `<tr><td colspan="8">Keine Standings für Saison ${season} gefunden.</td></tr>`;
      return;
    }

    // rendern
    elStandingsBody.innerHTML = standings
      .map((row) => {
        const pos = row.rank ?? "";
        const team = row.team?.name ?? "";
        const played = row.all?.played ?? "";
        const win = row.all?.win ?? "";
        const draw = row.all?.draw ?? "";
        const lose = row.all?.lose ?? "";
        const goalsFor = row.all?.goals?.for ?? "";
        const goalsAg = row.all?.goals?.against ?? "";
        const goals = `${goalsFor}:${goalsAg}`;
        const pts = row.points ?? "";
        return `<tr>
          <td>${pos}</td><td>${team}</td><td>${played}</td>
          <td>${win}</td><td>${draw}</td><td>${lose}</td>
          <td>${goals}</td><td>${pts}</td>
        </tr>`;
      })
      .join("");
  } catch (err) {
    console.error(err);
    elStandingsBody.innerHTML =
      `<tr><td colspan="8">Fehler beim Laden der Tabelle.</td></tr>`;
  }
}

// ---------- Helfer: Fetch mit Header ----------
async function fetchAPI(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: { "x-apisports-key": API_KEY }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} – ${res.statusText}`);
  }
  return res.json();
}