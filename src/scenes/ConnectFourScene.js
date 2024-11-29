import ConnectFourEngine from "../engine/ConnectFourEngine.js";
import ConnectFourAI from "../engine/ConnectFourAI.js";

export default class ConnectFourScene extends Phaser.Scene {
  constructor() {
    super({ key: "ConnectFourScene" });
  }

  preload() {
    // Caricamento di eventuali risorse se necessarie (non usato qui)
  }

  create() {
    // Costanti di configurazione
    const CELL_SIZE = 100; // Dimensione di ciascuna cella

    // Inizializzazione del motore di gioco e della griglia
    const engine = new ConnectFourEngine();
    const GRID_ROWS = engine.rows; // Numero di righe
    const GRID_COLUMNS = engine.columns; // Numero di colonne
    const GRID_WIDTH = GRID_COLUMNS * CELL_SIZE; // Larghezza totale della griglia
    const GRID_HEIGHT = GRID_ROWS * CELL_SIZE; // Altezza totale della griglia

    // Dimensioni del canvas (larghezza e altezza dinamiche)
    const CANVAS_WIDTH = this.cameras.main.width;
    const CANVAS_HEIGHT = this.cameras.main.height;

    // Calcolo degli offset per centrare la griglia
    const offsetX = (CANVAS_WIDTH - GRID_WIDTH) / 2;
    const offsetY = (CANVAS_HEIGHT - GRID_HEIGHT) / 2;

    // Inizializzazione della IA
    const ai = new ConnectFourAI(engine, 2, 1);
    let currentPlayer = 1; // Giocatore corrente (1 = umano, 2 = IA)
    let isInputEnabled = true; // Flag per abilitare/disabilitare i click

    // Disegno della griglia
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLUMNS; col++) {
        this.add
          .rectangle(
            offsetX + col * CELL_SIZE + CELL_SIZE / 2, // X centrata
            offsetY + row * CELL_SIZE + CELL_SIZE / 2, // Y centrata
            CELL_SIZE - 10,
            CELL_SIZE - 10,
            0x0000ff, // Colore blu
          )
          .setStrokeStyle(2, 0xffffff); // Bordo bianco
      }
    }

    // Gestione del click per il turno del giocatore umano
    this.input.on("pointerdown", (pointer) => {
      if (!isInputEnabled || currentPlayer !== 1) return;

      // Calcola la colonna corretta tenendo conto dell'offset
      const col = Math.floor((pointer.x - offsetX) / CELL_SIZE);

      // Verifica se il click è valido (dentro i limiti della griglia)
      if (col < 0 || col >= GRID_COLUMNS) return;

      const result = engine.dropPiece(col, currentPlayer); // Tenta di posizionare un pezzo
      if (!result) return; // Colonna piena, il click non è valido

      const { row } = result; // Ottieni la riga in cui è stato posizionato il pezzo
      addFallingPiece(col, row, 0xff0000, () => {
        handleTurnEnd(currentPlayer);
      });
    });

    /**
     * Aggiunge un pezzo con animazione di caduta
     * @param {number} col - La colonna del pezzo
     * @param {number} row - La riga del pezzo
     * @param {number} color - Colore del pezzo
     * @param {function} onComplete - Callback da eseguire al termine dell'animazione
     */
    const addFallingPiece = (col, row, color, onComplete) => {
      const startY = -CELL_SIZE / 2; // Posizione iniziale sopra la griglia
      const endX = offsetX + col * CELL_SIZE + CELL_SIZE / 2;
      const endY = offsetY + row * CELL_SIZE + CELL_SIZE / 2;

      // Crea il pezzo come un cerchio
      const piece = this.add.circle(endX, startY, CELL_SIZE / 3, color);

      // Anima la caduta del pezzo
      this.tweens.add({
        targets: piece,
        y: endY,
        duration: 500,
        ease: "Bounce.easeOut",
        onComplete: () => {
          if (onComplete) onComplete(); // Chiama il callback al termine dell'animazione
        },
      });
    };

    /**
     * Gestisce la fine di un turno e controlla lo stato del gioco
     * @param {number} player - Il giocatore che ha appena giocato
     */
    const handleTurnEnd = (player) => {
      const winner = engine.checkWinner(); // Controlla se qualcuno ha vinto
      if (winner) {
        // Mostra il messaggio di vittoria
        this.add.text(20, 50, `Player ${winner} wins!`, {
          fontSize: "32px",
          color: "#000000",
        });

        // Disabilita ulteriori input
        this.input.removeAllListeners();

        // Riavvia il gioco dopo 5 secondi
        this.time.delayedCall(5000, () => {
          this.scene.restart(); // Riavvia la scena corrente
        });
        return;
      }

      // Controlla se la partita è in pareggio
      if (engine.isDraw()) {
        // Mostra il messaggio di pareggio
        this.add.text(20, 50, "It's a draw!", {
          fontSize: "32px",
          color: "#000000",
        });

        // Disabilita ulteriori input
        this.input.removeAllListeners();

        // Riavvia il gioco dopo 5 secondi
        this.time.delayedCall(5000, () => {
          this.scene.restart(); // Riavvia la scena corrente
        });
        return;
      }

      // Passa al prossimo turno
      currentPlayer = currentPlayer === 1 ? 2 : 1;

      // Turno della IA
      if (currentPlayer === 2) {
        isInputEnabled = false; // Disabilita i click durante il turno della IA
        this.time.delayedCall(500, () => {
          const aiMove = ai.getBestMove(); // L'IA calcola la sua mossa
          const aiResult = engine.dropPiece(aiMove, currentPlayer);

          if (!aiResult) return;

          const { row } = aiResult;
          addFallingPiece(aiMove, row, 0xffff00, () => {
            isInputEnabled = true; // Riabilita i click dopo il turno della IA
            handleTurnEnd(currentPlayer);
          });
        });
      }
    };
  }
}
