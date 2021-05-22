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
    });
}
function interpretFen(fen) {
    return __awaiter(this, void 0, void 0, function* () {
        let board = [];
        for (let pos = 0; pos < fen.length; pos++) {
            let piece = null;
            let skip;
            if (fen[pos] == '/') {
            }
            for (let i = 0; i < fenChars.length; i++) {
                if (fenChars[i].fen == fen[pos]) {
                    if (fenChars[i].type == 'piece')
                        piece = fenChars[i].translation;
                    else if (fenChars[i].type == 'number')
                        skip = fenChars[i].translation;
                }
            }
            let cell = { pos: pos, piece: null };
            if (piece != null)
                cell.piece = piece;
            board.push(cell);
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
        // Skips
        for (let i = 1; i <= 8; i++)
            fenChars.push({ fen: i.toString(), translation: i, type: 'number' });
    });
}
init().then();
