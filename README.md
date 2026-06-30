# Warm Up Contest — sito completo

Sito statico della 9ª edizione (2-4 ottobre 2026, Tagliacozzo). Pronto per il deploy su Vercel.

## Pagine
- `index.html` — home
- `partecipare.html` — categorie, formule, requisiti, quote e iscrizione
- `galleria.html` — galleria foto (legge `galleria.json`)
- `scheda-adesione.html` — area iscritti: calcolatrice costi + preventivo PDF (protetta da codice)
- `style.css` — stile condiviso delle pagine pubbliche

## Cartelle
- `documenti/` — brochure PDF e modulo iscrizione (scaricabili dal sito)
- `dati/` — CSV dei contenuti (opzionali, per una futura gestione dinamica)
- `loghi/sporteam12.png` — SEGNAPOSTO: sostituire col logo vero (usato nel PDF)
- `img/galleria/<anno>/` — foto della galleria, una cartella per anno
- `scripts/genera-galleria.mjs` — rigenera `galleria.json` dalle cartelle foto

## Da personalizzare
- **WhatsApp**: i link puntano a `https://wa.me/393204117503` (chat provvisoria).
  Sostituiscili con il link del tuo CANALE WhatsApp in: `index.html`, `partecipare.html`,
  `galleria.html` e nel blocco CONFIG di `scheda-adesione.html`.
- **Codice area iscritti**: in `scheda-adesione.html`, CONFIG → `accesso`.
- **Logo Sporteam12**: sostituisci `loghi/sporteam12.png`.
- **Social**: il link Facebook nel footer è generico, mettici la pagina reale.

## Galleria — aggiungere foto
1. Metti le immagini in `img/galleria/2026/` (una cartella per anno).
2. Lancia `node scripts/genera-galleria.mjs`.
3. In `galleria.json`, sotto `edizioni`, scrivi l'etichetta dell'anno (es. "9ª").

## Pubblicare su GitHub + Vercel
Dalla cartella del progetto:

    git init
    git add .
    git commit -m "Sito Warm Up Contest"
    git branch -M main
    git remote add origin https://github.com/massimilianoaprea/warmup-content.git
    git push -u origin main

Poi su Vercel → progetto → Settings → Git → collega il repo: ogni push pubblica il sito.

## Nota
I prezzi e i testi vengono dalla brochure ufficiale 2026. Da confermare tre dettagli del
calcolo (supplemento camera singola, come scalare la gratuità, giorni accompagnatori).
