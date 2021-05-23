const boardContainer = document.getElementById('container') as HTMLElement;
let board:Cell[] = [];
const fenChars:FenAlloc[] = [];
// Function to initialize the Board


async function init() {
    let startFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    await initTranslation();
    await interpretFen(startFen).then(data => {
        board = data;
    });
    for (let i = 0; i < board.length; i++) console.log(board[i]);

    await initBoardPositions();
}

async function initBoardPositions() {
    let black = false;
    let grid = document.createElement('table') as HTMLTableElement;

    for (let y = 1; y <= 8; y++) {
        let row = document.createElement('tr') as HTMLTableRowElement;
        for (let x = 1; x <= 8; x++) {
            let cell = document.createElement('td');
            cell.classList.add('cell');
            if (black) cell.classList.add('black-cell');
            else cell.classList.add('white-cell');
            black = !black;

            row.appendChild(cell);
        }
        black = !black;
        grid.appendChild(row);
    }

    boardContainer.appendChild(grid);
}

async function interpretFen(fen:string):Promise<Cell[]> {
    let board:Cell[] = [];
    let counter = 0;
    for (let pos = 0; pos < fen.length; pos++) {
        let piece:Piece | null = null;
        let skip:number = 0;
        let skipLine = false;

        if (fen[pos] == '/') continue;

        counter++;

        for (let i = 0; i < fenChars.length; i++) {
            if (fenChars[i].fen == fen[pos]) {
                if (fenChars[i].type == 'number') skip = fenChars[i].translation as number;
                else if (fenChars[i].type == 'string') skipLine = true;
            }
        }

        for (let i = 0; i < skip; i++) {
            let cell:Cell = {pos: counter++, piece: null};
            board.push(cell);
        }

        for (let i = 0; i < fenChars.length; i++) {
            if (fenChars[i].fen == fen[pos]) {
                if (fenChars[i].type == 'piece') piece = fenChars[i].translation as Piece;
            }
        }

        let cell:Cell = {pos: counter, piece: null};
        if (piece != null) cell.piece = piece;

        if (skip == 0) {
            board.push(cell);
        }
    }

    return board;
}

async function initTranslation():Promise<void> {
    // Black Pieces
    fenChars.push({fen: 'p', translation: {color: 0, name: 'pawn', value: 1}, type: 'piece'});
    fenChars.push({fen: 'n', translation: {color: 0, name: 'knight', value: 3}, type: 'piece'});
    fenChars.push({fen: 'b', translation: {color: 0, name: 'bishop', value: 3}, type: 'piece'});
    fenChars.push({fen: 'r', translation: {color: 0, name: 'rook', value: 5}, type: 'piece'});
    fenChars.push({fen: 'q', translation: {color: 0, name: 'queen', value: 9}, type: 'piece'});
    fenChars.push({fen: 'k', translation: {color: 0, name: 'king', value: 10}, type: 'piece'});

    // White Pieces
    fenChars.push({fen: 'P', translation: {color: 1, name: 'pawn', value: 1}, type: 'piece'});
    fenChars.push({fen: 'N', translation: {color: 1, name: 'knight', value: 3}, type: 'piece'});
    fenChars.push({fen: 'B', translation: {color: 1, name: 'bishop', value: 3}, type: 'piece'});
    fenChars.push({fen: 'R', translation: {color: 1, name: 'rook', value: 5}, type: 'piece'});
    fenChars.push({fen: 'Q', translation: {color: 1, name: 'queen', value: 9}, type: 'piece'});
    fenChars.push({fen: 'K', translation: {color: 1, name: 'king', value: 10}, type: 'piece'});

    fenChars.push({fen: '/', translation: '/', type: 'string'})

    // Skips
    for (let i = 1; i <= 8; i++)
        fenChars.push({fen: i.toString(), translation: i, type: 'number'});
}

init().then();