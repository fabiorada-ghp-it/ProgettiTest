# Analisi del Progetto — ProgettiTest

## Panoramica

Il progetto è una piccola applicazione web scritta in **Go**, che serve una pagina HTML di impostazioni con sidebar di navigazione. È in fase iniziale di sviluppo.

---

## File del progetto

### `webserver.go` — Server HTTP in Go

**Scopo:** Entry point dell'applicazione. Avvia un server HTTP sulla porta `8080`.

**Funzionalità implementate:**
- Serve i file statici `styles.css` e `script.js` dalla directory corrente.
- Route `/` — renderizza il template `menu.html` via `html/template`.
- Route `/mostra` — gestita dalla funzione `mostraFile`, al momento **vuota** (non implementata).

**Note:**
- La funzione `mostraFile` è dichiarata ma non ha corpo: la voce "File" nel menu non restituisce ancora alcun contenuto.
- C'è una route commentata (`//http.HandleFunc("/", menu)`) che suggerisce una refactoring in corso.
- Non è presente gestione degli errori su `tmpl.Execute`.

---

### `menu.html` — Pagina HTML principale

**Scopo:** Interfaccia utente della sezione Impostazioni. Layout a due colonne: sidebar + area contenuto.

**Struttura:**
- **Sidebar** con 5 voci di menu:
  | Voce       | Azione (`data-action`) | Link        |
  |------------|------------------------|-------------|
  | Generale   | `generale`             | `#`         |
  | Privacy    | `privacy`              | `#`         |
  | Sicurezza  | `sicurezza`            | `#`         |
  | Aspetto    | `aspetto`              | `#`         |
  | File       | `File`                 | `/mostra`   |

- **Area contenuto** con un form GET vuoto e testo placeholder.
- Referenza a `script.js` (file non presente nel repository).

**Note:**
- Le prime 4 voci puntano a `#` — la navigazione client-side dovrebbe essere gestita da `script.js`, che però è assente.
- Solo la voce "File" esegue una chiamata server-side vera (`/mostra`).

---

### `styles.css` — Foglio di stile

**Scopo:** Definisce il tema visivo dark dell'applicazione.

**Tema:** Sfondo nero (`#000`), testo bianco/grigio, accenti in **ciano** (`#0ff`).

**Componenti stilizzati:**
| Selettore         | Descrizione                                      |
|-------------------|--------------------------------------------------|
| `body`            | Sfondo nero, testo bianco, font Arial            |
| `.wrapper`        | Flexbox full-height per il layout a due colonne  |
| `.sidebar`        | Larghezza fissa 220px, sfondo `#111`, ombra      |
| `.sidebar-header` | Titolo centrato in ciano                         |
| `.menu-item a`    | Bottoni con bordi arrotondati, hover in ciano    |
| `.content`        | Area principale con padding 40px                 |
| `h1`, `p`         | Titoli ciano, paragrafi grigio chiaro            |

---

### `Readme` — File di testo

**Contenuto:** Testo minimale ("Primo file da modificare — modificato"), usato probabilmente per testare il flusso git iniziale.

---

## Stato del progetto

| Componente         | Stato              |
|--------------------|--------------------|
| Server HTTP        | Funzionante        |
| Pagina menu        | Struttura presente |
| Stile dark theme   | Completo           |
| Navigazione JS     | Mancante (`script.js` assente) |
| Route `/mostra`    | Non implementata   |
| Gestione errori    | Assente            |

## Prossimi passi suggeriti

1. **Creare `script.js`** per gestire la navigazione client-side delle prime 4 voci del menu.
2. **Implementare `mostraFile`** in `webserver.go` per listare o visualizzare file.
3. Aggiungere gestione degli errori su `tmpl.Execute`.
4. Valutare se le route statiche vadano unificate sotto `/static/`.
