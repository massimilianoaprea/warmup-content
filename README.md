# Warm Up Contest — contenuti del sito

Repo dei contenuti per il deploy su Vercel (push → deploy automatico).

## Struttura
- `scheda-adesione.html` — scheda riservata con calcolatrice costi e generazione PDF
- `partecipare.html` — pagina partecipare (legge i testi dai CSV/foglio)
- `dati/` — `testi.csv`, `formule.csv`, `categorie.csv` (contenuti modificabili)
- `galleria.json` — elenco foto della galleria
- `scripts/genera-galleria.mjs` — rigenera galleria.json dalle cartelle in `img/galleria/<anno>/`
- `loghi/sporteam12.png` — SEGNAPOSTO: sostituire col logo vero

## Da personalizzare in scheda-adesione.html (blocco CONFIG)
- `accesso`  : codice di accesso per le squadre confermate
- `whatsapp` : link del canale WhatsApp

## Caricare su GitHub (la prima volta)
Dalla cartella di questo progetto:

    git init
    git add .
    git commit -m "Contenuti Warm Up Contest"
    git branch -M main
    git remote add origin https://github.com/massimilianoaprea/warmup-content.git
    git push -u origin main

## Deploy automatico
Su Vercel → progetto → Settings → Git → collega questo repo.
Da quel momento ogni `git push` pubblica il sito.
