type PieceName = 'king' | 'rook' | 'bishop' | 'queen' | 'knight' | 'pawn' | null;
type PieceValue = 10 | 9 | 5 | 3 | 1 | null;
type Color = 0 | 1 | null;
type Type = 'piece' | 'number';

interface FenAlloc {
    fen:string;
    translation:Piece | string | number;
    type:Type;
}

interface Piece {
    name:PieceName;
    color:Color;
    value:PieceValue;
}

interface Cell {
    piece:Piece | null;
    pos:number;
}