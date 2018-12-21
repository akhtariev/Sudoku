import {ISudokuFacade, 
    Board, 
    NotSolvedError
} from "./ISudokuFacade";
import {BoardGenerator} from "./utilities/BoardGenerator";


export class SudokuFacade implements ISudokuFacade {

    private boardGenerator: BoardGenerator;

    constructor() {
        this.boardGenerator = new BoardGenerator();
    }

    public solveBoard(board: Board): Promise<Board> {

        return new Promise<Board>((resolve, reject) => {
            let solution: (number | false)[] | false = this.solve(board.content);
            if (solution) {
                let result: Board = {content: solution};
                resolve(result);
            } else {
                reject(new NotSolvedError("The solution was not found for a given board"));
            }

        });

        return null;
    }


    private solve(board: (number | false)[]): (number | false)[] | false {
        if(this.isSolved(board)) {
            return board;
        } else {
            let newBoards = this.boardGenerator.generateNextBoards(board);
            for(let i = 0; i < newBoards.length; i++) {
                let tryFirst = this.solve(newBoards[i]);
    
                if(tryFirst !== false) {
    
                    return tryFirst;
                }
            }
            return false;
        }
    }

    /*
    Produces true when a board is solved
    */
    private isSolved(board: (number | false)[]): boolean {
        for(let i = 0; i < board.length; i++) {
            if(board[i] === false) {
                return false;
            }
        }
        return true;
    }
}

