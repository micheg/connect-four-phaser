export default class ConnectFourEngine {
  /**
   * Costruttore del motore di gioco.
   * @param {number} rows - Numero di righe nella griglia.
   * @param {number} columns - Numero di colonne nella griglia.
   */
  constructor(rows = 6, columns = 7) {
    this.rows = rows; // Numero di righe
    this.columns = columns; // Numero di colonne
    this.EMPTY = 0; // Valore per celle vuote
    // Inizializza la griglia come matrice 2D con tutte le celle vuote
    this.grid = Array.from({ length: rows }, () =>
      Array(columns).fill(this.EMPTY),
    );
  }

  /**
   * Posiziona un pezzo nella colonna specificata.
   * @param {number} column - La colonna in cui posizionare il pezzo.
   * @param {number} player - Il numero del giocatore che posiziona il pezzo.
   * @returns {object|null} Le coordinate della cella dove il pezzo è stato posizionato, o null se la colonna è piena.
   */
  dropPiece(column, player) {
    // Scorri la colonna dal basso verso l'alto
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][column] === this.EMPTY) {
        // Posiziona il pezzo nella prima cella vuota trovata
        this.grid[row][column] = player;
        return { row, column };
      }
    }
    // Se la colonna è piena, restituisci null
    return null;
  }

  /**
   * Controlla se un giocatore ha vinto la partita.
   * @returns {number} Il numero del giocatore vincitore, o 0 se non c'è alcun vincitore.
   */
  checkWinner() {
    // Direzioni per verificare le combinazioni: orizzontale, verticale, diagonale
    const directions = [
      { x: 1, y: 0 }, // Orizzontale
      { x: 0, y: 1 }, // Verticale
      { x: 1, y: 1 }, // Diagonale (basso-destra)
      { x: 1, y: -1 }, // Diagonale (alto-destra)
    ];

    // Scorri tutte le celle della griglia
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const player = this.grid[row][col];
        if (player === this.EMPTY) continue; // Salta le celle vuote

        // Controlla ogni direzione
        for (const dir of directions) {
          if (this.checkDirection(row, col, dir.x, dir.y, player)) {
            return player; // Restituisci il giocatore vincitore
          }
        }
      }
    }
    // Nessun vincitore
    return this.EMPTY;
  }

  /**
   * Controlla una direzione specifica per vedere se un giocatore ha 4 pezzi consecutivi.
   * @param {number} row - Riga iniziale.
   * @param {number} col - Colonna iniziale.
   * @param {number} dx - Incremento della colonna per ogni passo.
   * @param {number} dy - Incremento della riga per ogni passo.
   * @param {number} player - Il numero del giocatore da verificare.
   * @returns {boolean} True se il giocatore ha 4 pezzi consecutivi, altrimenti false.
   */
  checkDirection(row, col, dx, dy, player) {
    for (let i = 0; i < 4; i++) {
      const r = row + i * dy; // Calcola la riga corrente
      const c = col + i * dx; // Calcola la colonna corrente
      // Verifica se siamo fuori dalla griglia o se il pezzo non appartiene al giocatore
      if (
        r < 0 ||
        r >= this.rows || // Controlla i limiti verticali
        c < 0 ||
        c >= this.columns || // Controlla i limiti orizzontali
        this.grid[r][c] !== player // Controlla se il pezzo appartiene al giocatore
      ) {
        return false;
      }
    }
    // Trovati 4 pezzi consecutivi
    return true;
  }

  /**
   * Verifica se la partita è in pareggio (griglia piena).
   * @returns {boolean} True se tutte le celle sono occupate, altrimenti false.
   */
  isDraw() {
    // Controlla se tutte le celle della griglia sono occupate
    return this.grid.every((row) => row.every((cell) => cell !== this.EMPTY));
  }
}
