# Lern-Periode 7

24.10. bis 19.12.2025

## Grob-Planung

1. Für welche API möchten Sie ein eigenes *front end* erstellen? API-FOOTBALL
   
2. Welche groben Funktionalitäten soll Ihr *front end* zur Verfügung stellen? Fussball. Man soll zwischen verschiedenen Ligen und Mannschaften auswählen können um die Ergebnisse und die zukünftigen Spiele, Tabellen, Aufstellungen usw. zu sehen
   
3. Was möchten Sie insbesondere dabei lernen oder üben? Ich möchte so gut wie möglich mit Javascript umgehen können weil das ein wichtiger BEreich in der Informatik ist.

## 24.10.

- [x] Arbeitspaket 1: Erstellen Sie mehrere Skizzen von Ihrem *front end*. Überlegen Sie sich auch, welche Elemente die Interaktion mit dem *back end* auslösen und wie sich die Oberfläche dadurch verändert. Bauen Sie auch Interaktionen ein, die *keinen* Aufruf der API benötigen, sondern sich im *client* bearbeiten lassen (sortieren, suchen etc.)
- [x] Arbeitspaket 2: Setzen Sie in HTML und CSS Ihren Entwurf auf rudimentäre Weise um.
- [x] Arbeitspaket 3: Schreiben Sie ersten JS-Code als *proof of concept* (bspw. Meldung bei Klick auf Knopf-Element)

Heute habe ich mich entschieden eine Webseite über Fussball zu machen. Auf dieser WebApp soll man Resultate der ankommenden Spieltage, Tabellen, alte Spiele usw. aufrufen können. Danach einen ungefähren Lowfidelity-Prototyp auf Papier erstellt. Die Webapplikation soll ungefär so aussehen. Als nächstes habe ich eine Grundstruktur mit HTML und CSS erstellt. Ich wollte noch nicht alles machen, sondern einfach mal ein Grundgerüst erstellen. Danach habe ich zum Testen einen Button erstellt und ihn dan mit Javascript verbunden damit eine Meldung erscheint, wenn man den Button klickt. Ich wusste nicht wie man das macht also habe ich mir die KI zur Hilfe genommen.

![WhatsApp Bild 2025-10-24 um 11 40 45_d17261a2](https://github.com/user-attachments/assets/7d68b8ce-230d-4f1a-a103-2b6396a508dc)


## 31.10.

- [x] Header vervollständigen: Navi Links einfügen wie zum Beispiel Start Ligen Spiele...
- [x] Startseite: 3–6 Liga-Karten mit Name + kurzer Info.
- [x] Beim Klick auf eine Karte/Liga soll eine Nachricht per alert() erscheinen
- [x] css design verbessern

Heute habe ich die Navigation meiner Webseite KickyFH fertiggestellt und mehrere Seiten (Start, Ligen, Spiele) miteinander verbunden. Ausserdem habe ich mit JavaScript getestet, ob Klicks auf die Ligen funktionieren. Der Test mit der Meldung diente nur zur Überprüfung, dass mein Script richtig läuft. Danach habe ich das Projekt für die API-Verbindung vorbereitet, damit ich beim nächsten Mal echte Fußball-Daten abrufen kann.

## 7.11.
- [x] Verbindung zur API-Football herstellen und Daten abrufen. mit fetch()
- [x] Erste API-Daten im Browser darstellen. Aus den abgerufenen API-Daten werden Liga-Namen und Länder ausgelesen.
- [x] Benutzerfreundlichkeit verbessern. zum Beispiel: Falls ein Fehler auftritt (z. B. API offline oder Key falsch), erscheint eine Fehlermeldung im Browser.
- [x] mehr ligen hinzufügen
      
Heute habe ich versucht die api mit meiner seite zu verbinden. Es hat geklappt aber irgendwie hat es nocht probleme. ich sehe die daten der ligen nicht so ganz.

  
14.11.
- [x] die korrekten, also die top 5 ligen hinzufügen
- [x] Problem mit der verbindung lösen
- [x] Webseite schöner gestalten
- [x] benuterfreundlichkeit für handy anpassen

Heute habe ich die API mit meiner Webseite verbunden. Ich habe jetzt eine Tabelle der Premier league auf meiner Seite


21.11.
- [x] Methode um den API-Key privat zu halten erstellen
- [x] Andere Ligen it der Gleichen Variante hinzufügen
- [ ] Aktuelle Live daten hinzufügen und nicht alte tabellen 
- [x] Design anpassen

Heute habe ich versucht live Daten aus den Fusball-Tabellen zu laden. Ich wollte das ich auf meiner App nachschauen kann was gerade eben die aktuelle Tabelle ist. Jedoch habe ich später herausgefunden, dass man mit der Gratisversion leider nur die Daten bis 2023 abrufen kann. Jetzt habe ich Tabellen für die Top 5 Ligen aus dem Jahre 2023 erstellt. 

28.11.
- [ ] Die index.html Seite mit Inhalt befüllen, Z.B Algemeine News über Fussball
- [ ] Spielresultate auf der Spielseite Anzeigen lassen und sie besser gestalten
- [ ] css verbessern, smoother und moderneres Design
- [ ] Bilder von Spielern hinzufügen
