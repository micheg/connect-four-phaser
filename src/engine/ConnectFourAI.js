import ConnectFourEngine from "./ConnectFourEngine.js";

export default class ConnectFourAI {
  /**
   * Inizializza l'IA con il motore di gioco e i giocatori.
   * @param {ConnectFourEngine} engine - Istanza del motore di gioco.
   * @param {number} aiPlayer - ID del giocatore controllato dalla IA.
   * @param {number} opponentPlayer - ID del giocatore avversario.
   */
  constructor(engine, aiPlayer, opponentPlayer) {
    this.engine = engine;
    this.aiPlayer = aiPlayer;
    this.opponentPlayer = opponentPlayer;
  }

  /**
   * Determina la migliore mossa per l'IA.
   * @returns {number} La colonna scelta dalla IA.
   */
  getBestMove() {
    // 1. Controlla se è possibile bloccare una mossa vincente dell'avversario.
    for (let col = 0; col < this.engine.columns; col++) {
      if (this.canWin(this.opponentPlayer, col)) {
        return col; // Blocca l'avversario
      }
    }

    // 2. Controlla se l'IA può vincere direttamente.
    for (let col = 0; col < this.engine.columns; col++) {
      if (this.canWin(this.aiPlayer, col)) {
        return col; // Gioca per vincere
      }
    }

    // 3. Scegli una colonna valida casuale.
    const validColumns = this.getValidColumns();
    return validColumns[Math.floor(Math.random() * validColumns.length)];
  }

  /**
   * Verifica se un giocatore può vincere posizionando un pezzo in una colonna specifica.
   * @param {number} player - ID del giocatore da verificare.
   * @param {number} column - La colonna da simulare.
   * @returns {boolean} True se il giocatore può vincere, altrimenti false.
   */
  canWin(player, column) {
    // Crea una copia temporanea della griglia per la simulazione.
    const tempGrid = this.engine.grid.map((row) => [...row]);

    // Scorri la colonna dal basso verso l'alto.
    for (let row = this.engine.rows - 1; row >= 0; row--) {
      if (tempGrid[row][column] === this.engine.EMPTY) {
        // Simula il posizionamento del pezzo.
        tempGrid[row][column] = player;

        // Crea una copia temporanea del motore e verifica la vittoria.
        const engineCopy = new ConnectFourEngine(
          this.engine.rows,
          this.engine.columns,
        );
        engineCopy.grid = tempGrid;

        return engineCopy.checkWinner() === player;
      }
    }

    // Se la colonna è piena o non porta a una vittoria.
    return false;
  }

  /**
   * Ottiene un elenco di colonne valide per una mossa.
   * @returns {number[]} Un array con gli indici delle colonne valide.
   */
  getValidColumns() {
    const validColumns = [];
    for (let col = 0; col < this.engine.columns; col++) {
      // La colonna è valida se la prima riga è vuota.
      if (this.engine.grid[0][col] === this.engine.EMPTY) {
        validColumns.push(col);
      }
    }
    return validColumns;
  }
}
