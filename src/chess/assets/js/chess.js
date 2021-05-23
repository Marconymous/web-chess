"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const boardContainer = document.getElementById('container');
let board = [];
const fenChars = [];
// Function to initialize the Board
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let startFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
        yield initTranslation();
        yield interpretFen(startFen).then(data => {
            board = data;
        });
        for (let i = 0; i < board.length; i++)
            console.log(board[i]);
        yield initBoardPositions();
    });
}
function initBoardPositions() {
    return __awaiter(this, void 0, void 0, function* () {
        let black = false;
        let grid = document.createElement('table');
        let count = 0;
        for (let y = 0; y < 8; y++) {
            let row = document.createElement('tr');
            for (let x = 0; x < 8; x++) {
                let cell = document.createElement('td');
                cell.classList.add('cell');
                if (black)
                    cell.classList.add('black-cell');
                else
                    cell.classList.add('white-cell');
                black = !black;
                let piece = board[count].piece;
                if (piece != null) {
                    let image = document.createElement('img');
                    image.classList.add('piece');
                    image.src = 'assets/img/pieces/' + piece.color + '_' + piece.name + '.png';
                    cell.appendChild(image);
                }
                count++;
                row.appendChild(cell);
            }
            black = !black;
            grid.appendChild(row);
        }
        boardContainer.appendChild(grid);
    });
}
function interpretFen(fen) {
    return __awaiter(this, void 0, void 0, function* () {
        let board = [];
        let counter = 0;
        for (let pos = 0; pos < fen.length; pos++) {
            let piece = null;
            let skip = 0;
            let skipLine = false;
            if (fen[pos] == '/')
                continue;
            counter++;
            for (let i = 0; i < fenChars.length; i++) {
                if (fenChars[i].fen == fen[pos]) {
                    if (fenChars[i].type == 'number')
                        skip = fenChars[i].translation;
                    else if (fenChars[i].type == 'string')
                        skipLine = true;
                }
            }
            for (let i = 0; i < skip; i++) {
                let cell = { pos: counter++, piece: null };
                board.push(cell);
            }
            for (let i = 0; i < fenChars.length; i++) {
                if (fenChars[i].fen == fen[pos]) {
                    if (fenChars[i].type == 'piece')
                        piece = fenChars[i].translation;
                }
            }
            let cell = { pos: counter, piece: null };
            if (piece != null)
                cell.piece = piece;
            if (skip == 0) {
                board.push(cell);
            }
        }
        return board;
    });
}
function initTranslation() {
    return __awaiter(this, void 0, void 0, function* () {
        // Black Pieces
        fenChars.push({ fen: 'p', translation: { color: 0, name: 'pawn', value: 1 }, type: 'piece' });
        fenChars.push({ fen: 'n', translation: { color: 0, name: 'knight', value: 3 }, type: 'piece' });
        fenChars.push({ fen: 'b', translation: { color: 0, name: 'bishop', value: 3 }, type: 'piece' });
        fenChars.push({ fen: 'r', translation: { color: 0, name: 'rook', value: 5 }, type: 'piece' });
        fenChars.push({ fen: 'q', translation: { color: 0, name: 'queen', value: 9 }, type: 'piece' });
        fenChars.push({ fen: 'k', translation: { color: 0, name: 'king', value: 10 }, type: 'piece' });
        // White Pieces
        fenChars.push({ fen: 'P', translation: { color: 1, name: 'pawn', value: 1 }, type: 'piece' });
        fenChars.push({ fen: 'N', translation: { color: 1, name: 'knight', value: 3 }, type: 'piece' });
        fenChars.push({ fen: 'B', translation: { color: 1, name: 'bishop', value: 3 }, type: 'piece' });
        fenChars.push({ fen: 'R', translation: { color: 1, name: 'rook', value: 5 }, type: 'piece' });
        fenChars.push({ fen: 'Q', translation: { color: 1, name: 'queen', value: 9 }, type: 'piece' });
        fenChars.push({ fen: 'K', translation: { color: 1, name: 'king', value: 10 }, type: 'piece' });
        fenChars.push({ fen: '/', translation: '/', type: 'string' });
        // Skips
        for (let i = 1; i <= 8; i++)
            fenChars.push({ fen: i.toString(), translation: i, type: 'number' });
    });
}
init().then();
