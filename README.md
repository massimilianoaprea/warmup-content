# Warm Up Contest — sito web

Sito statico (HTML + CSS + JS) per il torneo di pallavolo pre-season **Warm Up Contest**.
Nessuna dipendenza da framework: si pubblica ovunque.

## Struttura
```
warmup-contest/
├─ index.html         # pagina unica (one-page) con tutte le sezioni
├─ css/style.css      # design system e layout
├─ js/main.js         # menu, animazioni, galleria/lightbox
├─ images/            # foto del torneo
├─ assets/favicon.svg # icona
├─ robots.txt
└─ sitemap.xml
```

## Pubblicazione
È un sito statico: caricalo così com'è.
- **Aruba / hosting classico:** carica tutta la cartella via FTP nella root del dominio.
- **Netlify / Vercel / Cloudflare Pages:** trascina la cartella o collega il repository.
- **GitHub Pages:** push del contenuto e attiva Pages dal branch.

> Mantieni `warmupeventi.it` come dominio: i meta tag, la sitemap e i dati
> strutturati usano già quell'URL.

## Cosa personalizzare prima di andare online
1. **Numeri reali** nella fascia statistiche (`index.html`, sezione `statband`):
   sostituisci i valori con n° edizioni, squadre e società reali.
2. **Date e categorie** dell'edizione corrente (sezioni "Partecipare").
3. **Regolamento:** il pulsante punta al PDF su Google Drive già in uso. Cambialo
   se carichi il PDF sul tuo dominio (consigliato per la SEO).
4. **Immagine social (Open Graph):** è impostata su `images/IMG_3687.jpg`.
   Per un'anteprima perfetta usa un'immagine 1200×630 px.

## SEO già inclusa
- Title e meta description ottimizzati, lingua `it`, canonical.
- Open Graph + Twitter Card per le condivisioni.
- Dati strutturati JSON-LD: Organization, WebSite, SportsEvent.
- HTML semantico (header/nav/main/section/footer), un solo `<h1>`, alt su tutte le immagini.
- `robots.txt` + `sitemap.xml`, immagini in lazy-load, prestazioni leggere.

### Dopo la messa online
- Verifica la proprietà su **Google Search Console** e invia `sitemap.xml`.
- Controlla i dati strutturati con il **Rich Results Test** di Google.
