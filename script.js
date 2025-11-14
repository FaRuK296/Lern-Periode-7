

// Diese Seite hat eine Tabelle mit leagueTitle + standingsBody
const titleEl = document.getElementById("leagueTitle");
const bodyEl  = document.getElementById("standingsBody");

// Nur ausführen, wenn wir wirklich auf der Ligen-Seite sind
if (titleEl && bodyEl) {
  loadStandings();
}

function loadStandings() {
  // Beispiel: Premier League 2023 (league=39, season=2023)
  const url = "https://v3.football.api-sports.io/standings?league=39&season=2023";

  // Lade-Text anzeigen
  bodyEl.innerHTML = `<tr><td colspan="8">Wird geladen …</td></tr>`;

fetch(url, {
  headers: {
    "x-apisports-key": API_KEY
  }
})
    .then(res => {
      console.log("HTTP Status:", res.status, res.statusText);
      if (!res.ok) {
        throw new Error("HTTP " + res.status + " " + res.statusText);
      }
      return res.json();
    })
    .then(data => {
      console.log("Rohdaten:", data);

      // Standings aus der Antwort holen
      const rows = data?.response?.[0]?.league?.standings?.[0] || [];

      if (!rows.length) {
        bodyEl.innerHTML = `<tr><td colspan="8">Keine Daten gefunden.</td></tr>`;
        return;
      }

      // Titel anpassen
      titleEl.textContent = "Premier League – Tabelle 2023";

      // Tabelle füllen
      bodyEl.innerHTML = rows.map(r => {
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
    })
    .catch(err => {
      console.error("FEHLER:", err);
      bodyEl.innerHTML = `<tr><td colspan="8">Fehler beim Laden: ${err.message}</td></tr>`;
    });
  }





