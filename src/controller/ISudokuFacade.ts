export interface Board {
    content: (number| false )[];
}

export class NotSolvedError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export class SudokuError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export interface ISudokuFacade {

    solveBoard(board: Board): Promise<Board>;

}