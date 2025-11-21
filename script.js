const API_KEY = "29cff8bf974b9b6dfd502addd7de24b1";

const LEAGUES = {
  39:  "Premier League",
  78:  "Bundesliga",
  140: "La Liga",
  135: "Serie A",
  61:  "Ligue 1"
};

const DEFAULT_SEASON = 2023;

const titleEl  = document.getElementById("leagueTitle");
const bodyEl   = document.getElementById("standingsBody");
const selectEl = document.getElementById("leagueSelect");


if (titleEl && bodyEl && selectEl) {
  initLeaguePage();
}


function initLeaguePage() {
 
  selectEl.addEventListener("change", () => {
    const leagueId = Number(selectEl.value);
    loadStandings(leagueId);
  });

 
  const startLeagueId = Number(selectEl.value);
  loadStandings(startLeagueId);
}


function loadStandings(leagueId) {
  const seasonYear = DEFAULT_SEASON;
  const leagueName = LEAGUES[leagueId] || "Liga";


  titleEl.textContent = `${leagueName} – Tabelle ${seasonYear}`;


  bodyEl.innerHTML = `<tr><td colspan="8">Wird geladen …</td></tr>`;

  const url =
    `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${seasonYear}`;

  fetch(url, {
    method: "GET",
    headers: {
      "x-apisports-key": API_KEY
    }
  })
    .then(res => {
      console.log("HTTP Status:", res.status, res.statusText);
      if (!res.ok) {
        
        return res.text().then(t => {
          console.error("Antwort-Text:", t);
          throw new Error("HTTP " + res.status + " " + res.statusText);
        });
      }
      return res.json();
    })
    .then(data => {
      console.log("Standings Antwort:", data);

      const rows = data?.response?.[0]?.league?.standings?.[0] || [];

      if (!rows.length) {
        bodyEl.innerHTML = `<tr><td colspan="8">Keine Daten für ${leagueName} ${seasonYear} gefunden.</td></tr>`;
        return;
      }

 
      const rowsHtml = rows.map(r => {
        const rank   = r.rank ?? "";
        const team   = r.team?.name ?? "";
        const played = r.all?.played ?? "";
        const win    = r.all?.win ?? "";
        const draw   = r.all?.draw ?? "";
        const lose   = r.all?.lose ?? "";
        const gf     = r.all?.goals?.for ?? "";
        const ga     = r.all?.goals?.against ?? "";
        const goals  = `${gf}:${ga}`;
        const pts    = r.points ?? "";

        return `
          <tr>
            <td>${rank}</td>
            <td>${team}</td>
            <td>${played}</td>
            <td>${win}</td>
            <td>${draw}</td>
            <td>${lose}</td>
            <td>${goals}</td>
            <td>${pts}</td>
          </tr>
        `;
      }).join("");

      bodyEl.innerHTML = rowsHtml;
    })
    .catch(err => {
      console.error("FEHLER:", err);
      bodyEl.innerHTML =
        `<tr><td colspan="8">Fehler beim Laden: ${err.message}</td></tr>`;
    });
}