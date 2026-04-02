# Guida al Deployment: Come Hostare Theledate Online

L'applicazione che abbiamo sviluppato (Theledate) è una **Single Page Application (SPA)** puramente frontend (basata su React e Vite). Tutti i calcoli astronomici e le chiamate API per la geolocalizzazione (es. Nominatim) avvengono direttamente nel browser dell'utente (client-side).

Questo significa che **non hai bisogno di un server backend complesso**. Ti basta generare i file statici del sito e caricarli su un provider in grado di "leggere" normalissimi file HTML e JavaScript.

Ecco i metodi principali per metterla online.

---

## Metodo 1: Upload su un Tuo Sito Web Esistente (Aruba, Siteground, cPanel via FTP)
Se possiedi già un sito web classico ed uno spazio Web (hosting tradizionale PHP, Apache o Nginx), l'operazione è semplicissima:

1. **Pre-Compilazione (Base URL)**:
   Se caricherai il calcolatore Thelemico all'interno di una sottocartella del tuo sito, (ad esempio `tuosito.com/calcolatore/`), devi prima dire al sistema di usare dei percorsi relativi per gli assets.
   Apri il file `vite.config.ts` e aggiungi `base: './',` all'interno della direttiva `defineConfig`. In questo modo l'HTML andrà a cercare il CSS ed il JS di cui necessita nella sua cartella relativa e non nella directory radice dell'hoster.
2. **Compila il progetto**:
   Esegui questo comando dal terminale all'interno del progetto:
   `npm run build`
   Quest'operazione comprimerà tutto il codice dell'app creando una nuova cartella chiamata **`dist`**.
3. **Carica i file**:
   Apri la cartella `dist`. Vedrai all'interno un file `index.html` e una cartella `assets`. Non ti serve nient'altro: prendi *solo* ed *esclusivamente* ciò che trovi dentro `dist` e caricalo (via FTP o File Manager) all'interno del tuo sito internet!

---

## Metodo 2: Hosting Moderno Gratuito (Vercel o Netlify)
Se non hai un server tutto tuo o vuoi uno spazio veloce, pre-ottimizzato e con sistema di certificati di sicurezza SSL (HTTPS) già inclusi, consigliamo **Vercel** o **Netlify**. Sono lo standard industriale di oggi.

1. Registrati e crea un account gratuito su [Vercel](https://vercel.com/) (o Netlify).
2. Esiste un metodo rapido a cascata in cui puoi letteralmente **trascinare un Drop** intero (Drag and Drop): apri l'interfaccia o la dashboard di Vercel o usa il tool Vercel CLI via terminale. In alternativa, se usi **GitHub**, carica l'intera applicazione su una tua Repo, e collega Vercel a GitHub stesso. 
3. Vercel capirà autonomamente che il tuo progetto usa "Vite / React", avvierà la build sui loro server (senza che tu debba fare nulla sul tuo PC) e ti fornirà dopo soli 1/2 minuti di attesa un collegamento pubblico es. `https://theledate-app.vercel.app`

*(Nota: su Vercel potrai anche associare in seguito dei domini presi a pagamento molto più personalizzati come `www.ilmionuovositoesoterico.it` gratuitamente senza limitazioni aggiuntive)*

---

## Metodo 3: GitHub Pages (Gratuito)
Hai già tutto il codice del front-end in GitHub e hai un account lì? GitHub ti offre un server gratis.

1. Installa il pacchetto gh-pages col seguente comando terminale:
   `npm install gh-pages --save-dev`
2. Modifica il file `package.json` aggiungendo nel campo "scripts" questo:
   `"deploy": "gh-pages -d dist"`
3. Controlla che in `vite.config.ts` ci sia scritto il base url (`base: '/NomeDellaTuaRepoGithub/'`).
4. Dal terminale invoca l'avvio della transizione live sul server:
   `npm run build && npm run deploy`
5. Vai nelle `Settings -> Pages` del tuo repository Github, e vedrai l'applicazione girare al link `iltuonomeutente.github.io/Nomedellarepo`.

---

## Ricapitolando: La regola di Vite e dell'HTML pre-compilato
La grande utilità dello stack software con cui abbiamo architettato l'applicazione è proprio che, potendo far funzionare tutta l'engine Thelemica / Astronomica lato browser locale, sei libero di ospitarla davvero **ovunque**. L'unica ed assoluta regola che devi tenere in mente è:
Le tue modifiche applicate al codice non sono online nativamente -> per convertire quest'app in un sito capace di funzionare online, va creata e ricalcolata sempre la cartella `dist/` tramite l'importantissimo comando testuale `npm run build`.
