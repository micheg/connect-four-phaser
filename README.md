# Connect Four con Phaser.js

Una versione digitale del gioco Forza Quattro implementata con Phaser.js, completa di motore di gioco e intelligenza artificiale.

## Caratteristiche
- Griglia dinamica centrata nel canvas
- Animazioni fluide per il posizionamento dei pezzi
- Intelligenza artificiale semplice ma efficace
- Supporto per il ridimensionamento responsivo

## Tecnologie Utilizzate
- **Phaser.js** per la grafica e l'interattività
- **JavaScript** per la logica del motore e l'algoritmo dell'IA
- **Vite** per il bundling del progetto

## Installazione
1. Clona il repository:
   ```bash
   git clone https://github.com/<tuo-username>/connect-four-phaser.git
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Avvia il progetto in modalità sviluppo
   ```bash
   npm run dev
   ```

# Costruire un Gioco di Forza Quattro con Phaser: Motore, IA e Implementazione

Forza Quattro è un gioco da tavolo molto amato, in cui due giocatori cercano di allineare quattro pezzi consecutivi su una griglia. Per realizzare una versione digitale di questo gioco, utilizziamo Phaser.js, un framework JavaScript per lo sviluppo di giochi 2D. L’implementazione si basa su tre componenti principali: il motore di gioco (engine), l’intelligenza artificiale (IA), e la scena di gioco, che integra il tutto con un’interfaccia visiva.

---

## L’implementazione con Phaser.js

Phaser.js gestisce il rendering del gioco e l’interazione dell’utente. La griglia del gioco è rappresentata come un insieme di rettangoli blu, centrati dinamicamente nel canvas per adattarsi a qualsiasi dimensione dello schermo. I pezzi dei giocatori sono disegnati come cerchi colorati (rosso e giallo), che “cadono” nelle posizioni corrette con un’animazione fluida.

La scena di gioco si occupa di tre aspetti principali. Primo, disegna la griglia e i pezzi dei giocatori, assicurandosi che siano sempre ben centrati. Secondo, gestisce l’input dell’utente, traducendo i clic del mouse in mosse valide sulla griglia. Terzo, coordina i turni, alternando il controllo tra il giocatore umano e l’IA.

Per migliorare l’esperienza visiva, ogni pezzo posizionato “cade” con un effetto di rimbalzo prima di raggiungere la sua posizione finale. Questo è realizzato utilizzando i tweens di Phaser, che facilitano l’animazione degli elementi grafici.

---

## Il motore di gioco

Il motore di gioco è responsabile della logica di base, come gestire la griglia, determinare le mosse valide, verificare le vittorie e controllare se la partita è in pareggio. La griglia è rappresentata da una matrice bidimensionale, in cui ogni cella può contenere il valore 0 (vuota), 1 (giocatore 1), o 2 (giocatore 2). Quando un giocatore effettua una mossa, il motore controlla dalla riga più bassa verso l’alto per trovare la prima cella disponibile nella colonna scelta.

Per determinare un vincitore, il motore analizza ogni cella occupata e verifica se ci sono quattro pezzi consecutivi in una qualsiasi direzione: orizzontale, verticale o diagonale. Se non ci sono vincitori e tutte le celle sono occupate, la partita termina in pareggio. Questa struttura modulare permette al motore di essere riutilizzato in altri progetti o versioni estese del gioco.

---

## L’algoritmo della IA

L’intelligenza artificiale è progettata per essere semplice ma efficace. Durante il suo turno, l’IA considera tre strategie. La priorità massima è bloccare eventuali mosse vincenti del giocatore avversario. Se non ci sono mosse da bloccare, l’IA cerca di vincere immediatamente posizionando un pezzo in una colonna favorevole. Se nessuna di queste condizioni è soddisfatta, l’IA seleziona una colonna valida casualmente.

Per determinare se una mossa è vincente o deve essere bloccata, l’IA simula il posizionamento del pezzo in ogni colonna valida e verifica se il motore segnala una vittoria. Questa logica di simulazione utilizza una copia temporanea della griglia, evitando di alterare lo stato reale del gioco. Infine, per garantire che l’IA non tenti di giocare in colonne già piene, queste vengono scartate automaticamente.

---
## Esperienza utente e interattività

Durante la partita, l’utente può cliccare su una colonna per posizionare un pezzo. Il sistema calcola automaticamente la posizione corretta sulla griglia e aggiunge l’animazione di caduta. Dopo ogni mossa, il motore verifica se c’è un vincitore o se la partita è in pareggio. Se la partita termina, un messaggio visivo informa l’utente del risultato, e il gioco può ricominciare automaticamente dopo pochi secondi.

Quando è il turno dell’IA, i clic dell’utente vengono temporaneamente disabilitati per garantire che l’IA possa completare la sua mossa senza interferenze. L’intero flusso di gioco è progettato per essere fluido e intuitivo, offrendo un’esperienza simile a quella di una partita reale di Forza Quattro.

---

## In sintesi

La versione digitale di Forza Quattro sviluppata con Phaser.js combina una grafica semplice ma accattivante con una logica di gioco ben definita. La separazione tra il motore, l’IA e la scena di gioco rende il progetto facilmente estendibile. Possibili miglioramenti includono l’aggiunta di livelli di difficoltà per l’IA, il supporto multiplayer e un sistema di punteggio. Questo progetto dimostra come un framework come Phaser possa essere utilizzato per creare esperienze di gioco interattive, modulabili e piacevoli per l’utente.
